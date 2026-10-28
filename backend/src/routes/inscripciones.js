import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { requiereSesion } from '../utils/requiereSesion.js'
import { OCUPA_CUPO } from '../utils/cupos.js'
import { enviarCorreoCancelacion, enviarCorreoInscripcion } from '../utils/correo.js'
import { buscarPagosPorReferencia } from '../utils/mercadopago.js'
import { esUuid, normalizarTelefono, textoOpcional } from '../utils/validar.js'

const router = Router()

function validarBody(body = {}) {
  const errores = {}

  if (!esUuid(body.actividadId)) errores.actividadId = 'Elige un curso, taller o evento'
  if (body.terminos !== true) errores.terminos = 'Debes aceptar los términos'

  const mensaje = textoOpcional(body.mensaje, 2000)
  if (mensaje.error) errores.mensaje = mensaje.error

  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'Revisa los datos del formulario', errores)
  }

  return { actividadId: body.actividadId, mensaje: mensaje.valor }
}

// Solo para cuentas anteriores a que apellido y teléfono fueran obligatorios:
// se piden una vez y quedan guardados en la cuenta. Si la cuenta ya los tiene,
// lo que llegue en el cuerpo se ignora (los datos de la persona son los de su cuenta).
function datosFaltantes(usuario, body = {}) {
  const errores = {}
  let apellido = usuario.apellido
  let telefono = usuario.telefono

  if (!apellido) {
    const valor = typeof body.apellido === 'string' ? body.apellido.trim() : ''
    if (!valor) errores.apellido = 'El apellido es obligatorio'
    else if (valor.length > 100) errores.apellido = 'Máximo 100 caracteres'
    else apellido = valor
  }

  if (!telefono) {
    const valor = normalizarTelefono(body.telefono)
    if (!valor) {
      errores.telefono =
        'Escribe un teléfono válido: 10 dígitos o con lada internacional (por ejemplo +57 300 123 4567)'
    } else if (normalizarTelefono(body.telefonoConfirmacion) !== valor) {
      errores.telefonoConfirmacion = 'Los teléfonos no coinciden'
    } else {
      telefono = valor
    }
  }

  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'Revisa los datos del formulario', errores)
  }
  return { apellido, telefono }
}

router.post('/inscripciones', requiereSesion, async (req, res) => {
  const datos = validarBody(req.body)
  const client = await pool.connect()

  try {
    await client.query('begin')

    const { rows: actividades } = await client.query(
      `select id, costo, capacidad_maxima
         from actividades
        where id = $1 and estado = 'publicada' and fecha_fin > now()
        for update`,
      [datos.actividadId],
    )
    const actividad = actividades[0]
    if (!actividad) throw new HttpError(404, 'La actividad ya no está disponible')

    const { rows: usuarios } = await client.query(
      `select id, apellido, telefono from usuarios where id = $1`,
      [req.usuarioId],
    )
    const usuario = usuarios[0]

    if (!usuario.apellido || !usuario.telefono) {
      const completos = datosFaltantes(usuario, req.body)
      await client.query(`update usuarios set apellido = $2, telefono = $3 where id = $1`, [
        usuario.id,
        completos.apellido,
        completos.telefono,
      ])
    }

    const { rows: previas } = await client.query(
      `select i.id, i.estado, p.estado as estado_pago
         from inscripciones i
         left join pagos p on p.inscripcion_id = i.id
        where i.usuario_id = $1 and i.actividad_id = $2`,
      [usuario.id, actividad.id],
    )
    const previa = previas[0]
    if (previa && !['cancelada', 'reembolsada'].includes(previa.estado)) {
      throw new HttpError(409, 'Ya tienes una inscripción a esta actividad')
    }

    if (actividad.capacidad_maxima !== null) {
      const { rows } = await client.query(
        `select count(*)::int as total
           from inscripciones
          where actividad_id = $1 and ${OCUPA_CUPO}`,
        [actividad.id],
      )
      if (rows[0].total >= actividad.capacidad_maxima) {
        throw new HttpError(409, 'Esta actividad ya no tiene cupos disponibles')
      }
    }

    // Quien pagó, canceló y vuelve antes de recibir el reembolso ya tiene su pago aprobado:
    // se le confirma con ese pago (así tampoco se pisa el registro del pago al pedir otro).
    const yaPagada = previa?.estado === 'cancelada' && previa.estado_pago === 'aprobado'
    const estado = Number(actividad.costo) > 0 && !yaPagada ? 'pendiente_pago' : 'confirmada'

    let inscripcionId
    if (previa) {
      await client.query(
        `update inscripciones set estado = $1, mensaje = $2, fecha_inscripcion = now() where id = $3`,
        [estado, datos.mensaje, previa.id],
      )
      inscripcionId = previa.id
    } else {
      const { rows } = await client.query(
        `insert into inscripciones (usuario_id, actividad_id, estado, mensaje)
         values ($1, $2, $3, $4)
         returning id`,
        [usuario.id, actividad.id, estado, datos.mensaje],
      )
      inscripcionId = rows[0].id
    }

    await client.query('commit')
    enviarCorreoInscripcion(inscripcionId) // sin esperar: el envío no retrasa la respuesta

    res.status(201).json({
      id: inscripcionId,
      estado,
      mensaje:
        estado === 'confirmada'
          ? '¡Listo! Tu lugar quedó confirmado. Te contactaremos por correo con los detalles.'
          : 'Recibimos tu inscripción. Te enviaremos por correo las instrucciones de pago para confirmar tu lugar.',
    })
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
})

// La persona deja su inscripción antes de que empiece la actividad. No se borra: queda
// "cancelada" (deja de ocupar cupo al instante) para conservar el pago y el historial.
// Si ya había pagado, el reembolso se hace a mano en Mercado Pago y el panel lo marca pendiente.
router.post('/inscripciones/:id/cancelar', requiereSesion, async (req, res) => {
  if (!esUuid(req.params.id)) throw new HttpError(404, 'Inscripción no encontrada')

  // Un pago iniciado puede estar aprobado en Mercado Pago sin que el sitio lo sepa aún.
  // Antes de cancelar se pide conciliarlo, para que la cancelación sepa si hay que reembolsar.
  const { rows: previas } = await pool.query(
    `select i.estado, p.preferencia_id
       from inscripciones i
       left join pagos p on p.inscripcion_id = i.id
      where i.id = $1 and i.usuario_id = $2`,
    [req.params.id, req.usuarioId],
  )
  if (!previas[0]) throw new HttpError(404, 'Inscripción no encontrada')
  if (previas[0].estado === 'pendiente_pago' && previas[0].preferencia_id) {
    const pagos = await buscarPagosPorReferencia(req.params.id)
    if (pagos.some((p) => p.status === 'approved')) {
      throw new HttpError(409, 'Encontramos un pago aprobado de esta inscripción. Recarga la página e intenta de nuevo.')
    }
  }

  const client = await pool.connect()
  let reembolso
  try {
    await client.query('begin')

    const { rows } = await client.query(
      `select i.id, i.estado, a.estado as estado_actividad, (a.fecha_inicio <= now()) as empezada,
              coalesce(p.estado = 'aprobado', false) as pagada
         from inscripciones i
         join actividades a on a.id = i.actividad_id
         left join pagos p on p.inscripcion_id = i.id
        where i.id = $1 and i.usuario_id = $2
        for update of i`,
      [req.params.id, req.usuarioId],
    )
    const inscripcion = rows[0]
    if (!inscripcion) throw new HttpError(404, 'Inscripción no encontrada')
    if (!['confirmada', 'pendiente_pago', 'lista_espera'].includes(inscripcion.estado)) {
      throw new HttpError(409, 'Esta inscripción ya no está activa')
    }
    if (inscripcion.estado_actividad === 'cancelada') {
      throw new HttpError(409, 'La actividad fue cancelada; el equipo de Beaken te contactará')
    }
    if (inscripcion.empezada) {
      throw new HttpError(409, 'La actividad ya empezó; ya no se puede cancelar la inscripción')
    }

    await client.query(`update inscripciones set estado = 'cancelada' where id = $1`, [inscripcion.id])
    await client.query('commit')
    reembolso = inscripcion.pagada
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }

  enviarCorreoCancelacion(req.params.id, reembolso) // sin esperar, como el de inscripción
  res.json({
    id: req.params.id,
    estado: 'cancelada',
    reembolso,
    mensaje: reembolso
      ? 'Cancelamos tu inscripción y liberamos tu lugar. Te escribiremos por correo para hacer el reembolso.'
      : 'Cancelamos tu inscripción y liberamos tu lugar.',
  })
})

export default router
