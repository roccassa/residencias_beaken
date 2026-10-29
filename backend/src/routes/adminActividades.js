import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { OCUPA_CUPO } from '../utils/cupos.js'
import { esUuid, textoOpcional } from '../utils/validar.js'

// Rutas del panel para las actividades. Se montan en /api/admin, detrás de requiereAdmin (app.js).
const router = Router()

const TIPOS = ['curso', 'taller', 'evento']
const MODALIDADES = ['presencial', 'virtual']
const ESTADOS = ['borrador', 'publicada', 'cancelada', 'finalizada']

// Personas que ocupan un lugar (confirmadas o con reserva vigente) de la actividad "a".
const INSCRITOS = `(select count(*)::int from inscripciones where actividad_id = a.id and ${OCUPA_CUPO})`
// Con alguna inscripción (en cualquier estado) o pago, la actividad ya tiene historial.
const TIENE_HISTORIAL = `exists (select 1 from inscripciones where actividad_id = a.id)`

const esFecha = (valor) => typeof valor === 'string' && valor.length <= 40 && !Number.isNaN(Date.parse(valor))
// Dirección completa (http/https) o ruta del propio sitio ("/img/..."); nada de "javascript:".
const esImagen = (valor) => /^(https?:\/\/|\/(?!\/))\S+$/.test(valor)

function mapDetalle(r) {
  return {
    id: r.id,
    tipo: r.tipo,
    titulo: r.titulo,
    descripcion: r.descripcion,
    categoriaId: r.categoria_id,
    instructorId: r.instructor_id,
    modalidad: r.modalidad,
    ubicacionId: r.ubicacion_id,
    costo: Number(r.costo),
    moneda: r.moneda,
    capacidadMaxima: r.capacidad_maxima,
    fechaInicio: r.fecha_inicio,
    fechaFin: r.fecha_fin,
    estado: r.estado,
    imagen: r.imagen_url,
    inscritos: r.inscritos,
    tieneHistorial: r.tiene_historial,
  }
}

async function buscar(client, id, bloquear = false) {
  if (!esUuid(id)) throw new HttpError(404, 'Actividad no encontrada')
  const { rows } = await client.query(
    `select a.*, ${INSCRITOS} as inscritos, ${TIENE_HISTORIAL} as tiene_historial
       from actividades a
      where a.id = $1
      ${bloquear ? 'for update' : ''}`,
    [id],
  )
  if (!rows[0]) throw new HttpError(404, 'Actividad no encontrada')
  return rows[0]
}

// Valida el cuerpo del formulario. Las referencias (categoría, ubicación, instructor)
// se comprueban contra la base para responder con un mensaje claro y no con un error de clave.
async function validarActividad(client, body = {}) {
  const errores = {}

  const titulo = typeof body.titulo === 'string' ? body.titulo.trim() : ''
  if (!titulo) errores.titulo = 'El título es obligatorio'
  else if (titulo.length > 200) errores.titulo = 'Máximo 200 caracteres'

  if (!TIPOS.includes(body.tipo)) errores.tipo = 'Elige curso, taller o evento'
  if (!MODALIDADES.includes(body.modalidad)) errores.modalidad = 'Elige presencial o virtual'
  if (!ESTADOS.includes(body.estado)) errores.estado = 'Elige un estado válido'

  const descripcion = textoOpcional(body.descripcion, 5000)
  if (descripcion.error) errores.descripcion = descripcion.error

  if (!esFecha(body.fechaInicio)) errores.fechaInicio = 'Indica la fecha y hora de inicio'
  if (!esFecha(body.fechaFin)) errores.fechaFin = 'Indica la fecha y hora de fin'
  else if (esFecha(body.fechaInicio) && Date.parse(body.fechaFin) < Date.parse(body.fechaInicio)) {
    errores.fechaFin = 'El fin no puede ser antes del inicio'
  }

  const costo = body.costo
  if (typeof costo !== 'number' || !Number.isFinite(costo) || costo < 0) {
    errores.costo = 'El costo debe ser 0 o mayor'
  } else if (costo > 99999999.99 || Math.round(costo * 100) !== costo * 100) {
    errores.costo = 'Usa un monto válido con hasta dos decimales'
  }

  const capacidad = body.capacidadMaxima ?? null
  if (capacidad !== null && (!Number.isInteger(capacidad) || capacidad < 1 || capacidad > 100000)) {
    errores.capacidadMaxima = 'El cupo debe ser un número entero de 1 en adelante, o vacío para sin límite'
  }

  let imagen = null
  if (body.imagen !== undefined && body.imagen !== null && body.imagen !== '') {
    imagen = typeof body.imagen === 'string' ? body.imagen.trim() : ''
    if (imagen.length > 500 || !esImagen(imagen)) {
      errores.imagen = 'Escribe una dirección que empiece con https:// o una ruta del sitio como /img/...'
    }
  }

  const categoriaId = body.categoriaId || null
  if (categoriaId) {
    const { rows } = esUuid(categoriaId)
      ? await client.query('select tipo_actividad from categorias where id = $1', [categoriaId])
      : { rows: [] }
    if (!rows[0]) errores.categoriaId = 'La categoría no existe'
    else if (rows[0].tipo_actividad && rows[0].tipo_actividad !== body.tipo) {
      errores.categoriaId = 'La categoría no corresponde a este tipo de actividad'
    }
  }

  const instructorId = body.instructorId || null
  if (instructorId) {
    const { rows } = esUuid(instructorId)
      ? await client.query('select 1 from instructores where id = $1', [instructorId])
      : { rows: [] }
    if (!rows[0]) errores.instructorId = 'El instructor no existe'
  }

  // Solo las presenciales llevan ubicación; en las virtuales se descarta.
  const ubicacionId = body.modalidad === 'presencial' ? body.ubicacionId || null : null
  if (body.modalidad === 'presencial') {
    if (!ubicacionId) errores.ubicacionId = 'Las actividades presenciales necesitan una ubicación'
    else {
      const { rows } = esUuid(ubicacionId)
        ? await client.query('select 1 from ubicaciones where id = $1', [ubicacionId])
        : { rows: [] }
      if (!rows[0]) errores.ubicacionId = 'La ubicación no existe'
    }
  }

  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'Revisa los datos del formulario', errores)
  }

  return [
    body.tipo,
    titulo,
    categoriaId,
    descripcion.valor,
    body.modalidad,
    ubicacionId,
    costo,
    instructorId,
    capacidad,
    body.fechaInicio,
    body.fechaFin,
    body.estado,
    imagen,
  ]
}

// Todas las actividades (también pasadas, borradores y canceladas), de la más reciente a la más antigua.
router.get('/actividades', async (req, res) => {
  const { rows } = await pool.query(
    `select a.id, a.titulo, a.tipo, a.fecha_inicio, a.estado, a.capacidad_maxima, a.costo, a.moneda,
            ${INSCRITOS} as inscritos
       from actividades a
      order by a.fecha_inicio desc`,
  )
  res.json(
    rows.map((r) => ({
      id: r.id,
      titulo: r.titulo,
      tipo: r.tipo,
      fechaInicio: r.fecha_inicio,
      estado: r.estado,
      capacidadMaxima: r.capacidad_maxima,
      costo: Number(r.costo),
      moneda: r.moneda,
      inscritos: r.inscritos,
    })),
  )
})

router.get('/actividades/:id', async (req, res) => {
  res.json(mapDetalle(await buscar(pool, req.params.id)))
})

router.post('/actividades', async (req, res) => {
  const valores = await validarActividad(pool, req.body)
  const { rows } = await pool.query(
    `insert into actividades
       (tipo, titulo, categoria_id, descripcion, modalidad, ubicacion_id, costo,
        instructor_id, capacidad_maxima, fecha_inicio, fecha_fin, estado, imagen_url)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     returning id`,
    valores,
  )
  res.status(201).json({ id: rows[0].id })
})

router.put('/actividades/:id', async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('begin')
    // Se bloquea la actividad: así nadie se inscribe mientras se revisa el cupo.
    const actual = await buscar(client, req.params.id, true)
    const valores = await validarActividad(client, req.body)

    const capacidad = valores[8]
    if (capacidad !== null && capacidad < actual.inscritos) {
      throw new HttpError(400, 'Revisa los datos del formulario', {
        capacidadMaxima: `No puede ser menor a ${actual.inscritos}: ya hay ${actual.inscritos} personas inscritas`,
      })
    }
    if (capacidad !== null && actual.capacidad_minima !== null && capacidad < actual.capacidad_minima) {
      throw new HttpError(400, 'Revisa los datos del formulario', {
        capacidadMaxima: `No puede ser menor al cupo mínimo (${actual.capacidad_minima})`,
      })
    }

    await client.query(
      `update actividades
          set tipo = $1, titulo = $2, categoria_id = $3, descripcion = $4, modalidad = $5,
              ubicacion_id = $6, costo = $7, instructor_id = $8, capacidad_maxima = $9,
              fecha_inicio = $10, fecha_fin = $11, estado = $12, imagen_url = $13
        where id = $14`,
      [...valores, actual.id],
    )
    await client.query('commit')
    res.json({ id: actual.id })
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
})

// Cancelar conserva inscripciones y pagos; la actividad deja de verse en el catálogo.
router.post('/actividades/:id/cancelar', async (req, res) => {
  const actividad = await buscar(pool, req.params.id)
  await pool.query(`update actividades set estado = 'cancelada' where id = $1`, [actividad.id])
  res.json({ ok: true })
})

// Eliminar solo si no tiene inscripciones ni pagos: la base borraría en cascada ese historial.
router.delete('/actividades/:id', async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('begin')
    const actividad = await buscar(client, req.params.id, true)
    if (actividad.tiene_historial) {
      throw new HttpError(409, 'Esta actividad tiene inscripciones o pagos: no se puede eliminar, solo cancelar')
    }
    await client.query('delete from actividades where id = $1', [actividad.id])
    await client.query('commit')
    res.json({ ok: true })
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
})

export default router
