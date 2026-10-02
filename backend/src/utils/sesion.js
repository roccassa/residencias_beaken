import jwt from 'jsonwebtoken'
import { HttpError } from './errors.js'

const COOKIE = 'beaken_session'
const DURACION_MS = 7 * 24 * 60 * 60 * 1000

const opcionesCookie = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
})

const secreto = () => {
  const valor = process.env.JWT_SECRET
  return valor && valor.length >= 32 ? valor : null
}

function secretoObligatorio() {
  const clave = secreto()
  if (!clave) {
    console.error('Falta JWT_SECRET (mínimo 32 caracteres) en backend/.env')
    throw new HttpError(503, 'El inicio de sesión no está configurado en el servidor')
  }
  return clave
}

// Se llama al inicio de las rutas que escriben, para fallar antes de tocar la base.
export function asegurarSesionConfigurada() {
  secretoObligatorio()
}

export function iniciarSesion(res, usuarioId) {
  const token = jwt.sign({ sub: usuarioId }, secretoObligatorio(), { expiresIn: '7d' })
  res.cookie(COOKIE, token, { ...opcionesCookie(), maxAge: DURACION_MS })
}

export function cerrarSesion(res) {
  res.clearCookie(COOKIE, opcionesCookie())
}

export function leerSesion(req) {
  const clave = secreto()
  const token = req.cookies?.[COOKIE]
  if (!clave || !token) return null

  try {
    return jwt.verify(token, clave, { algorithms: ['HS256'] }).sub ?? null
  } catch {
    return null
  }
}
