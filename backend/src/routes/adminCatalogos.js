import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { esCorreo, textoOpcional } from '../utils/validar.js'

// Listas del formulario de actividades (categorías, ubicaciones, instructores) y la creación
// de nuevas desde el botón "+ Nueva". Se montan en /api/admin, detrás de requiereAdmin (app.js).
const router = Router()

const TIPOS = ['curso', 'taller', 'evento']

function nombreObligatorio(valor, maximo, errores) {
  const nombre = typeof valor === 'string' ? valor.trim() : ''
  if (!nombre) errores.nombre = 'El nombre es obligatorio'
  else if (nombre.length > maximo) errores.nombre = `Máximo ${maximo} caracteres`
  return nombre
}

function revisar(errores) {
  if (Object.keys(errores).length > 0) throw new HttpError(400, 'Revisa los datos', errores)
}

router.get('/catalogos', async (req, res) => {
  const [categorias, ubicaciones, instructores] = await Promise.all([
    pool.query('select id, nombre, tipo_actividad from categorias order by nombre'),
    pool.query('select id, nombre, ciudad from ubicaciones order by nombre'),
    pool.query('select id, nombre from instructores order by nombre'),
  ])
  res.json({
    categorias: categorias.rows.map((c) => ({ id: c.id, nombre: c.nombre, tipoActividad: c.tipo_actividad })),
    ubicaciones: ubicaciones.rows,
    instructores: instructores.rows,
  })
})

router.post('/categorias', async (req, res) => {
  const errores = {}
  const nombre = nombreObligatorio(req.body?.nombre, 100, errores)
  const tipo = req.body?.tipoActividad ?? null
  if (tipo !== null && !TIPOS.includes(tipo)) errores.tipoActividad = 'Tipo de actividad no válido'
  revisar(errores)

  const { rows: repetida } = await pool.query(
    `select id from categorias
      where lower(nombre) = lower($1) and tipo_actividad is not distinct from $2::tipo_actividad_enum`,
    [nombre, tipo],
  )
  if (repetida[0]) throw new HttpError(409, 'Ya existe esa categoría', { nombre: 'Ya existe esa categoría' })

  const { rows } = await pool.query(
    'insert into categorias (nombre, tipo_actividad) values ($1, $2) returning id, nombre, tipo_actividad',
    [nombre, tipo],
  )
  res.status(201).json({ id: rows[0].id, nombre: rows[0].nombre, tipoActividad: rows[0].tipo_actividad })
})

router.post('/ubicaciones', async (req, res) => {
  const errores = {}
  const nombre = nombreObligatorio(req.body?.nombre, 150, errores)
  const direccion = textoOpcional(req.body?.direccion, 255)
  if (direccion.error) errores.direccion = direccion.error
  const ciudad = textoOpcional(req.body?.ciudad, 100)
  if (ciudad.error) errores.ciudad = ciudad.error
  const mapa = textoOpcional(req.body?.mapaUrl, 500)
  if (mapa.error) errores.mapaUrl = mapa.error
  else if (mapa.valor && !/^https?:\/\/\S+$/.test(mapa.valor)) errores.mapaUrl = 'Debe empezar con https://'
  revisar(errores)

  const { rows } = await pool.query(
    `insert into ubicaciones (nombre, direccion, ciudad, pais, mapa_url)
     values ($1, $2, $3, 'México', $4)
     returning id, nombre, ciudad`,
    [nombre, direccion.valor, ciudad.valor, mapa.valor],
  )
  res.status(201).json(rows[0])
})

router.post('/instructores', async (req, res) => {
  const errores = {}
  const nombre = nombreObligatorio(req.body?.nombre, 150, errores)
  const correo = typeof req.body?.correo === 'string' ? req.body.correo.trim().toLowerCase() : ''
  if (correo && !esCorreo(correo)) errores.correo = 'Escribe un correo válido o déjalo vacío'
  revisar(errores)

  const { rows } = await pool.query(
    'insert into instructores (nombre, correo) values ($1, $2) returning id, nombre',
    [nombre, correo || null],
  )
  res.status(201).json(rows[0])
})

export default router
