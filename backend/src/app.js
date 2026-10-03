import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { pool } from './db.js'
import { HttpError } from './utils/errors.js'
import actividades from './routes/actividades.js'
import inscripciones from './routes/inscripciones.js'
import empresas from './routes/empresas.js'
import auth from './routes/auth.js'
import misInscripciones from './routes/misInscripciones.js'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json({ limit: '50kb' }))
app.use(cookieParser())

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('select 1')
    res.json({ ok: true })
  } catch {
    res.status(503).json({ ok: false, error: 'No hay conexión con la base de datos' })
  }
})

app.use('/api', actividades)
app.use('/api', inscripciones)
app.use('/api', empresas)
app.use('/api', auth)
app.use('/api', misInscripciones)

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, campos: err.campos })
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es JSON válido' })
  }
  console.error(err)
  res.status(500).json({ error: 'Ocurrió un error en el servidor' })
})

export default app
