import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { esUuid, normalizarTelefono } from '../utils/validar.js'

// Rutas del panel para los usuarios. Se montan en /api/admin, detrás de requiereAdmin (app.js).
// Los usuarios no se borran (se perdería su historial de inscripciones y pagos): se desactivan.
const router = Router()

const ROLES = ['usuario', 'admin']

const publico = (u) => ({
  id: u.id,
  nombre: u.nombre,
  apellido: u.apellido,
  correo: u.correo,
  telefono: u.telefono,
  rol: u.rol,
  activo: u.activo,
})

function validarUsuario(body = {}) {
  const errores = {}

  const nombre = typeof body.nombre === 'string' ? body.nombre.trim() : ''
  if (!nombre) errores.nombre = 'El nombre es obligatorio'
  else if (nombre.length > 100) errores.nombre = 'Máximo 100 caracteres'

  const apellido = typeof body.apellido === 'string' ? body.apellido.trim() : ''
  if (apellido.length > 100) errores.apellido = 'Máximo 100 caracteres'

  // El teléfono puede quedar vacío (cuentas antiguas); si se escribe, debe ser válido.
  const textoTelefono = typeof body.telefono === 'string' ? body.telefono.trim() : ''
  const telefono = textoTelefono ? normalizarTelefono(textoTelefono) : null
  if (textoTelefono && !telefono) {
    errores.telefono = 'Escribe un teléfono válido: 10 dígitos o con lada internacional (por ejemplo +57 300 123 4567)'
  }

  if (!ROLES.includes(body.rol)) errores.rol = 'Elige usuario o administrador'
  if (typeof body.activo !== 'boolean') errores.activo = 'Indica si la cuenta está activa'

  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'Revisa los datos del formulario', errores)
  }
  return { nombre, apellido: apellido || null, telefono, rol: body.rol, activo: body.activo }
}

router.get('/usuarios', async (req, res) => {
  const { rows } = await pool.query(
    `select id, nombre, apellido, correo, telefono, rol, activo
       from usuarios
      order by lower(nombre), lower(coalesce(apellido, ''))`,
  )
  res.json(rows.map(publico))
})

router.get('/usuarios/:id', async (req, res) => {
  if (!esUuid(req.params.id)) throw new HttpError(404, 'Usuario no encontrado')

  const { rows } = await pool.query(
    `select id, nombre, apellido, correo, telefono, rol, activo, fecha_registro
       from usuarios where id = $1`,
    [req.params.id],
  )
  if (!rows[0]) throw new HttpError(404, 'Usuario no encontrado')

  const { rows: inscripciones } = await pool.query(
    `select i.id, i.estado, a.id as actividad_id, a.titulo, a.tipo, a.fecha_inicio,
            (i.estado = 'cancelada' and p.estado = 'aprobado') as reembolso_pendiente
       from inscripciones i
       join actividades a on a.id = i.actividad_id
       left join pagos p on p.inscripcion_id = i.id
      where i.usuario_id = $1
      order by a.fecha_inicio desc`,
    [req.params.id],
  )

  res.json({
    ...publico(rows[0]),
    fechaRegistro: rows[0].fecha_registro,
    inscripciones: inscripciones.map((i) => ({
      id: i.id,
      estado: i.estado,
      reembolsoPendiente: i.reembolso_pendiente === true,
      actividad: { id: i.actividad_id, titulo: i.titulo, tipo: i.tipo, fechaInicio: i.fecha_inicio },
    })),
  })
})

router.put('/usuarios/:id', async (req, res) => {
  if (!esUuid(req.params.id)) throw new HttpError(404, 'Usuario no encontrado')
  const datos = validarUsuario(req.body)
  const quitaAdmin = datos.rol !== 'admin' || !datos.activo

  if (req.params.id === req.usuarioId && quitaAdmin) {
    throw new HttpError(409, 'No puedes quitarte el rol de administrador ni desactivar tu propia cuenta')
  }

  const client = await pool.connect()
  try {
    await client.query('begin')

    // Se bloquean los administradores activos: dos cambios a la vez no pueden dejar el sitio sin ninguno.
    const { rows: admins } = await client.query(
      `select id from usuarios where rol = 'admin' and activo for update`,
    )
    const { rows } = await client.query('select id from usuarios where id = $1 for update', [req.params.id])
    if (!rows[0]) throw new HttpError(404, 'Usuario no encontrado')

    const esAdminActivo = admins.some((a) => a.id === req.params.id)
    if (esAdminActivo && quitaAdmin && admins.length <= 1) {
      throw new HttpError(409, 'Debe quedar al menos un administrador activo')
    }

    const { rows: actualizado } = await client.query(
      `update usuarios
          set nombre = $2, apellido = $3, telefono = $4, rol = $5, activo = $6
        where id = $1
        returning id, nombre, apellido, correo, telefono, rol, activo`,
      [req.params.id, datos.nombre, datos.apellido, datos.telefono, datos.rol, datos.activo],
    )
    await client.query('commit')
    res.json(publico(actualizado[0]))
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
})

// El reembolso se hace a mano en Mercado Pago; aquí solo se registra que ya se devolvió
// el pago de una inscripción que la persona canceló.
router.post('/inscripciones/:id/reembolsada', async (req, res) => {
  if (!esUuid(req.params.id)) throw new HttpError(404, 'Inscripción no encontrada')

  const client = await pool.connect()
  try {
    await client.query('begin')
    const { rows } = await client.query(
      `select i.id, i.estado, p.estado as estado_pago
         from inscripciones i
         left join pagos p on p.inscripcion_id = i.id
        where i.id = $1
        for update of i`,
      [req.params.id],
    )
    const inscripcion = rows[0]
    if (!inscripcion) throw new HttpError(404, 'Inscripción no encontrada')
    if (inscripcion.estado !== 'cancelada' || inscripcion.estado_pago !== 'aprobado') {
      throw new HttpError(409, 'Esta inscripción no tiene un reembolso pendiente')
    }

    await client.query(`update pagos set estado = 'reembolsado' where inscripcion_id = $1`, [inscripcion.id])
    await client.query(`update inscripciones set estado = 'reembolsada' where id = $1`, [inscripcion.id])
    await client.query('commit')
    res.json({ id: inscripcion.id, estado: 'reembolsada' })
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
})

export default router
