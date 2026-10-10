import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { requiereSesion } from '../utils/requiereSesion.js'
import { esUuid } from '../utils/validar.js'
import { limitador } from '../utils/limitador.js'
import { OCUPA_CUPO } from '../utils/cupos.js'
import { enviarCorreoInscripcion } from '../utils/correo.js'
import { buscarPagosPorReferencia, crearPreferencia, obtenerPago } from '../utils/mercadopago.js'

const router = Router()

const limite = limitador({ maximo: 60, ventanaMs: 15 * 60 * 1000, clave: (req) => req.ip })

const frontend = () => process.env.CORS_ORIGIN ?? 'http://localhost:5173'

// Estado de Mercado Pago -> estado de nuestro pago.
const ESTADO_PAGO = {
  approved: 'aprobado',
  authorized: 'pendiente',
  in_process: 'pendiente',
  in_mediation: 'pendiente',
  pending: 'pendiente',
  rejected: 'rechazado',
  cancelled: 'rechazado',
  refunded: 'reembolsado',
  charged_back: 'reembolsado',
}

const METODO = {
  credit_card: 'tarjeta',
  debit_card: 'tarjeta',
  prepaid_card: 'tarjeta',
  bank_transfer: 'transferencia',
  account_money: 'transferencia',
  ticket: 'efectivo',
  atm: 'efectivo',
}

// Crea la preferencia de Checkout Pro de una inscripción pendiente y devuelve
// la dirección de Mercado Pago a la que hay que enviar a la persona.
router.post('/inscripciones/:id/pagar', requiereSesion, limite, async (req, res) => {
  if (!esUuid(req.params.id)) throw new HttpError(404, 'Inscripción no encontrada')

  const client = await pool.connect()
  let inscripcion
  try {
    await client.query('begin')

    const { rows } = await client.query(
      `select i.id, i.estado, a.id as actividad_id, a.titulo, a.costo, a.moneda,
              a.capacidad_maxima, a.estado as estado_actividad, (a.fecha_fin < now()) as finalizada
         from inscripciones i
         join actividades a on a.id = i.actividad_id
        where i.id = $1 and i.usuario_id = $2
        for update of a, i`,
      [req.params.id, req.usuarioId],
    )
    inscripcion = rows[0]
    if (!inscripcion) throw new HttpError(404, 'Inscripción no encontrada')
    if (inscripcion.estado !== 'pendiente_pago') {
      throw new HttpError(409, 'Esta inscripción no tiene un pago pendiente')
    }
    if (inscripcion.estado_actividad !== 'publicada' || inscripcion.finalizada) {
      throw new HttpError(409, 'Esta actividad ya no está disponible')
    }
    if (Number(inscripcion.costo) <= 0) {
      throw new HttpError(409, 'Esta actividad no tiene costo')
    }

    if (inscripcion.capacidad_maxima !== null) {
      const { rows: ocupados } = await client.query(
        `select count(*)::int as total
           from inscripciones
          where actividad_id = $1 and id <> $2 and ${OCUPA_CUPO}`,
        [inscripcion.actividad_id, inscripcion.id],
      )
      if (ocupados[0].total >= inscripcion.capacidad_maxima) {
        throw new HttpError(409, 'Esta actividad ya no tiene cupos disponibles')
      }
    }

    // Renueva la reserva del lugar mientras se paga.
    await client.query(`update inscripciones set fecha_inscripcion = now() where id = $1`, [
      inscripcion.id,
    ])
    await client.query('commit')
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }

  const volver = `${frontend()}/pago/resultado`
  const preferencia = await crearPreferencia({
    items: [
      {
        id: inscripcion.actividad_id,
        title: inscripcion.titulo,
        quantity: 1,
        unit_price: Number(inscripcion.costo),
        currency_id: inscripcion.moneda,
      },
    ],
    external_reference: inscripcion.id,
    back_urls: { success: volver, pending: volver, failure: volver },
    statement_descriptor: 'BEAKEN',
  })

  await pool.query(
    `insert into pagos (inscripcion_id, monto, moneda, pasarela, preferencia_id, estado)
     values ($1, $2, $3, 'mercadopago', $4, 'pendiente')
     on conflict (inscripcion_id) do update
        set monto = excluded.monto, moneda = excluded.moneda, pasarela = excluded.pasarela,
            preferencia_id = excluded.preferencia_id, estado = 'pendiente'`,
    [inscripcion.id, inscripcion.costo, inscripcion.moneda, preferencia.id],
  )

  res.json({ url: preferencia.init_point })
})

// Consulta a Mercado Pago el estado real del pago y actualiza la inscripción.
// No se confía en lo que traiga la dirección de regreso: cualquiera podría escribirla.
// Se llama con el id del pago (al volver de Mercado Pago) o con el de la inscripción
// (si la persona pagó pero no volvió al sitio).
router.post('/pagos/verificar', requiereSesion, limite, async (req, res) => {
  const { paymentId, inscripcionId } = req.body ?? {}

  let pago
  if (paymentId !== undefined && paymentId !== null && paymentId !== '') {
    if (!/^\d{1,20}$/.test(String(paymentId))) throw new HttpError(400, 'Pago no válido')
    pago = await obtenerPago(String(paymentId))
  } else if (esUuid(inscripcionId)) {
    const pagos = await buscarPagosPorReferencia(inscripcionId)
    pago = pagos.find((p) => p.status === 'approved') ?? pagos[0]
    if (!pago) return res.json({ estado: 'sin_pago', inscripcionId })
  } else {
    throw new HttpError(400, 'Indica el pago o la inscripción a verificar')
  }

  if (!esUuid(pago.external_reference)) throw new HttpError(404, 'Pago no encontrado')

  let confirmadaAhora = false
  const client = await pool.connect()
  try {
    await client.query('begin')

    const { rows } = await client.query(
      `select i.id, i.estado, a.titulo, p.monto, p.moneda, p.estado as estado_pago
         from inscripciones i
         join actividades a on a.id = i.actividad_id
         left join pagos p on p.inscripcion_id = i.id
        where i.id = $1 and i.usuario_id = $2
        for update of i`,
      [pago.external_reference, req.usuarioId],
    )
    const inscripcion = rows[0]
    if (!inscripcion || !inscripcion.monto) throw new HttpError(404, 'Pago no encontrado')

    if (
      Number(pago.transaction_amount) !== Number(inscripcion.monto) ||
      pago.currency_id !== inscripcion.moneda
    ) {
      throw new HttpError(409, 'El pago no coincide con la inscripción')
    }

    let nuevo = ESTADO_PAGO[pago.status] ?? 'pendiente'
    // Un pago antiguo (rechazado, por ejemplo) no debe deshacer uno ya aprobado.
    if (inscripcion.estado_pago === 'aprobado' && !['aprobado', 'reembolsado'].includes(nuevo)) {
      nuevo = 'aprobado'
    } else {
      await client.query(
        `update pagos
            set estado = $2::estado_pago_enum, referencia_pasarela = $3, metodo_pago = $4,
                fecha_pago = case when $2::text = 'aprobado' then coalesce($5::timestamptz, now()) else fecha_pago end
          where inscripcion_id = $1`,
        [
          inscripcion.id,
          nuevo,
          String(pago.id),
          METODO[pago.payment_type_id] ?? null,
          pago.date_approved ?? null,
        ],
      )
    }

    if (nuevo === 'aprobado' && inscripcion.estado === 'pendiente_pago') {
      await client.query(`update inscripciones set estado = 'confirmada' where id = $1`, [
        inscripcion.id,
      ])
      confirmadaAhora = true
    } else if (nuevo === 'reembolsado' && inscripcion.estado === 'confirmada') {
      await client.query(`update inscripciones set estado = 'reembolsada' where id = $1`, [
        inscripcion.id,
      ])
    }

    await client.query('commit')
    // Solo en el paso a confirmada: verificar el mismo pago otra vez no repite el correo.
    if (confirmadaAhora) enviarCorreoInscripcion(inscripcion.id)
    res.json({ estado: nuevo, inscripcionId: inscripcion.id, titulo: inscripcion.titulo })
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
})

export default router
