import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { esCorreo, esUuid, textoOpcional } from '../utils/validar.js'

const router = Router()

function validarBody(body = {}) {
  const errores = {}

  const nombre = typeof body.nombre === 'string' ? body.nombre.trim() : ''
  if (!nombre) errores.nombre = 'El nombre es obligatorio'
  else if (nombre.length > 100) errores.nombre = 'Máximo 100 caracteres'

  const correo = typeof body.correo === 'string' ? body.correo.trim().toLowerCase() : ''
  if (!esCorreo(correo)) errores.correo = 'Escribe un correo válido'

  if (!esUuid(body.actividadId)) errores.actividadId = 'Elige un curso, taller o evento'

  if (body.terminos !== true) errores.terminos = 'Debes aceptar los términos'

  const apellido = textoOpcional(body.apellido, 100)
  if (apellido.error) errores.apellido = apellido.error
  const telefono = textoOpcional(body.telefono, 30)
  if (telefono.error) errores.telefono = telefono.error
  const mensaje = textoOpcional(body.mensaje, 2000)
  if (mensaje.error) errores.mensaje = mensaje.error

  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'Revisa los datos del formulario', errores)
  }

  return {
    nombre,
    correo,
    actividadId: body.actividadId,
    apellido: apellido.valor,
    telefono: telefono.valor,
    mensaje: mensaje.valor,
  }
}

router.post('/inscripciones', async (req, res) => {
  const datos = validarBody(req.body)
  const client = await pool.connect()

  try {
    await client.query('begin')

    const { rows: actividades } = await client.query(
      `select id, costo, capacidad_maxima
         from actividades
        where id = $1 and estado = 'publicada'
        for update`,
      [datos.actividadId],
    )
    const actividad = actividades[0]
    if (!actividad) throw new HttpError(404, 'La actividad ya no está disponible')

    const { rows: usuarios } = await client.query(
      `insert into usuarios (nombre, apellido, correo, telefono)
       values ($1, $2, $3, $4)
       on conflict (correo) do update
          set apellido = coalesce(usuarios.apellido, excluded.apellido),
              telefono = coalesce(usuarios.telefono, excluded.telefono)
       returning id`,
      [datos.nombre, datos.apellido, datos.correo, datos.telefono],
    )
    const usuarioId = usuarios[0].id

    const { rows: previas } = await client.query(
      `select id, estado from inscripciones where usuario_id = $1 and actividad_id = $2`,
      [usuarioId, actividad.id],
    )
    const previa = previas[0]
    if (previa && !['cancelada', 'reembolsada'].includes(previa.estado)) {
      throw new HttpError(409, 'Ya tienes una inscripción a esta actividad con ese correo')
    }

    if (actividad.capacidad_maxima !== null) {
      const { rows } = await client.query(
        `select count(*)::int as total
           from inscripciones
          where actividad_id = $1 and estado = 'confirmada'`,
        [actividad.id],
      )
      if (rows[0].total >= actividad.capacidad_maxima) {
        throw new HttpError(409, 'Esta actividad ya no tiene cupos disponibles')
      }
    }

    const estado = Number(actividad.costo) > 0 ? 'pendiente_pago' : 'confirmada'

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
        [usuarioId, actividad.id, estado, datos.mensaje],
      )
      inscripcionId = rows[0].id
    }

    await client.query('commit')

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

export default router
