import { pool } from '../db.js'
import { HttpError } from './errors.js'
import { leerSesion } from './sesion.js'

// Protege las rutas del panel. El rol se consulta en la base en cada petición (no se
// guarda en la cookie), así que quitar el rol o desactivar una cuenta surte efecto al instante.
export async function requiereAdmin(req, res, next) {
  const usuarioId = leerSesion(req)
  if (!usuarioId) throw new HttpError(401, 'Inicia sesión para continuar')

  const { rows } = await pool.query('select id, rol from usuarios where id = $1 and activo', [usuarioId])
  if (!rows[0]) throw new HttpError(401, 'Inicia sesión para continuar')
  if (rows[0].rol !== 'admin') throw new HttpError(403, 'No tienes permiso para entrar al panel de administración')

  req.usuarioId = rows[0].id
  next()
}
