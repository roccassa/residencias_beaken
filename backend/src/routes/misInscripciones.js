import { Router } from 'express'
import { pool } from '../db.js'
import { requiereSesion } from '../utils/requiereSesion.js'
import { formatDuracion } from '../utils/duracion.js'

const router = Router()

router.get('/mis-inscripciones', requiereSesion, async (req, res) => {
  const { rows } = await pool.query(
    `select i.id as inscripcion_id, i.estado as estado_inscripcion, i.fecha_inscripcion,
            a.id as actividad_id, a.tipo, a.titulo, a.descripcion, a.modalidad,
            a.costo, a.moneda, a.fecha_inicio, a.fecha_fin, a.imagen_url,
            a.estado as estado_actividad, u.nombre as ubicacion,
            (a.fecha_fin < now()) as finalizada
       from inscripciones i
       join actividades a on a.id = i.actividad_id
       left join ubicaciones u on u.id = a.ubicacion_id
      where i.usuario_id = $1
        and i.estado in ('confirmada', 'pendiente_pago', 'lista_espera')
        and a.estado <> 'borrador'
      order by (a.fecha_fin < now()), a.fecha_inicio`,
    [req.usuarioId],
  )

  res.json(
    rows.map((r) => ({
      id: r.inscripcion_id,
      estado: r.estado_inscripcion,
      fechaInscripcion: r.fecha_inscripcion,
      actividad: {
        id: r.actividad_id,
        tipo: r.tipo,
        titulo: r.titulo,
        descripcion: r.descripcion,
        modalidad: r.modalidad,
        ubicacion: r.ubicacion,
        costo: Number(r.costo),
        moneda: r.moneda,
        fechaInicio: r.fecha_inicio,
        fechaFin: r.fecha_fin,
        duracion: formatDuracion(r.fecha_inicio, r.fecha_fin),
        imagen: r.imagen_url,
        cancelada: r.estado_actividad === 'cancelada',
        finalizada: r.finalizada,
      },
    })),
  )
})

export default router
