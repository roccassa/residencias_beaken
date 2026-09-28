import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { esCorreo } from '../utils/validar.js'

const router = Router()

router.post('/empresas/interes', async (req, res) => {
  const correo =
    typeof req.body?.correo === 'string' ? req.body.correo.trim().toLowerCase() : ''

  if (!esCorreo(correo)) {
    throw new HttpError(400, 'Revisa el correo', { correo: 'Escribe un correo válido' })
  }

  await pool.query('insert into solicitudes_empresa (correo) values ($1)', [correo])

  res.status(201).json({ mensaje: '¡Gracias! Te contactaremos pronto.' })
})

export default router
