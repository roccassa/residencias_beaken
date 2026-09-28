import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { formatDuracion } from '../utils/duracion.js'

const TIPOS = ['curso', 'taller', 'evento']

const router = Router()

function validarTipo(tipo) {
  if (tipo !== undefined && !TIPOS.includes(tipo)) {
    throw new HttpError(400, `El tipo debe ser uno de: ${TIPOS.join(', ')}`)
  }
  return tipo ?? null
}

function mapActividad(r) {
  return {
    id: r.id,
    tipo: r.tipo,
    titulo: r.titulo,
    descripcion: r.descripcion,
    modalidad: r.modalidad,
    ubicacion: r.ubicacion,
    categoriaId: r.categoria_id,
    categoria: r.categoria,
    costo: Number(r.costo),
    moneda: r.moneda,
    capacidadMaxima: r.capacidad_maxima,
    inscritosConfirmados: r.inscritos_confirmados,
    cuposDisponibles: r.cupos_disponibles,
    agotada:
      r.capacidad_maxima !== null && r.inscritos_confirmados >= r.capacidad_maxima,
    fechaInicio: r.fecha_inicio,
    fechaFin: r.fecha_fin,
    duracion: formatDuracion(r.fecha_inicio, r.fecha_fin),
    imagen: r.imagen_url,
  }
}

router.get('/actividades', async (req, res) => {
  const tipo = validarTipo(req.query.tipo)

  const { rows } = await pool.query(
    `select v.id, v.tipo, v.titulo, v.descripcion, v.modalidad, v.costo, v.moneda,
            v.capacidad_maxima, v.fecha_inicio, v.fecha_fin, v.imagen_url,
            v.categoria_id, c.nombre as categoria, u.nombre as ubicacion,
            v.inscritos_confirmados::int as inscritos_confirmados,
            v.cupos_disponibles::int as cupos_disponibles
       from vw_actividades_disponibilidad v
       left join categorias c on c.id = v.categoria_id
       left join ubicaciones u on u.id = v.ubicacion_id
      where v.estado = 'publicada'
        and ($1::text is null or v.tipo::text = $1)
      order by v.fecha_inicio`,
    [tipo],
  )

  res.json(rows.map(mapActividad))
})

router.get('/categorias', async (req, res) => {
  const tipo = validarTipo(req.query.tipo)

  const { rows } = await pool.query(
    `select id, nombre
       from categorias
      where $1::text is null or tipo_actividad::text = $1 or tipo_actividad is null
      order by nombre`,
    [tipo],
  )

  res.json(rows)
})

export default router
