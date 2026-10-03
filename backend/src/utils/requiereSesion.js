import { pool } from '../db.js'
import { HttpError } from './errors.js'
import { leerSesion } from './sesion.js'

export async function requiereSesion(req, res, next) {
  const usuarioId = leerSesion(req)
  if (!usuarioId) throw new HttpError(401, 'Inicia sesión para continuar')

  const { rows } = await pool.query('select id from usuarios where id = $1 and activo', [usuarioId])
  if (!rows[0]) throw new HttpError(401, 'Inicia sesión para continuar')

  req.usuarioId = rows[0].id
  next()
}
