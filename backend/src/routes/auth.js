import { Router } from 'express'
import { pool } from '../db.js'
import { HttpError } from '../utils/errors.js'
import { esCorreo, normalizarTelefono } from '../utils/validar.js'
import { HASH_RELLENO, hashPassword, verifyPassword } from '../utils/password.js'
import {
  asegurarSesionConfigurada,
  cerrarSesion,
  iniciarSesion,
  leerSesion,
} from '../utils/sesion.js'
import { limitador } from '../utils/limitador.js'

const router = Router()

const correoDe = (req) =>
  typeof req.body?.correo === 'string' ? req.body.correo.trim().toLowerCase() : ''

const limiteLogin = limitador({
  maximo: 20,
  ventanaMs: 15 * 60 * 1000,
  clave: (req) => `${req.ip}|${correoDe(req)}`,
})
const limiteRegistro = limitador({
  maximo: 20,
  ventanaMs: 60 * 60 * 1000,
  clave: (req) => req.ip,
})

const publico = (u) => ({
  id: u.id,
  nombre: u.nombre,
  apellido: u.apellido,
  correo: u.correo,
  telefono: u.telefono,
})

function validarPassword(valor, errores) {
  if (typeof valor !== 'string' || valor.length < 8) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres'
  } else if (valor.length > 128) {
    errores.password = 'Máximo 128 caracteres'
  }
}

router.post('/auth/registro', limiteRegistro, async (req, res) => {
  asegurarSesionConfigurada()

  const errores = {}
  const nombre = typeof req.body?.nombre === 'string' ? req.body.nombre.trim() : ''
  if (!nombre) errores.nombre = 'El nombre es obligatorio'
  else if (nombre.length > 100) errores.nombre = 'Máximo 100 caracteres'

  const correo = correoDe(req)
  if (!esCorreo(correo)) errores.correo = 'Escribe un correo válido'

  const apellido = typeof req.body?.apellido === 'string' ? req.body.apellido.trim() : ''
  if (!apellido) errores.apellido = 'El apellido es obligatorio'
  else if (apellido.length > 100) errores.apellido = 'Máximo 100 caracteres'

  const telefono = normalizarTelefono(req.body?.telefono)
  if (!telefono) {
    errores.telefono =
      'Escribe un teléfono válido: 10 dígitos o con lada internacional (por ejemplo +57 300 123 4567)'
  } else if (normalizarTelefono(req.body?.telefonoConfirmacion) !== telefono) {
    errores.telefonoConfirmacion = 'Los teléfonos no coinciden'
  }

  validarPassword(req.body?.password, errores)

  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'Revisa los datos del formulario', errores)
  }

  const passwordHash = await hashPassword(req.body.password)

  // Un correo con fila previa nunca se reclama al registrarse: una cuenta solo
  // nace aquí, así que nadie hereda inscripciones ni datos de otra persona.
  const { rows } = await pool.query(
    `insert into usuarios (nombre, apellido, correo, telefono, password_hash)
     values ($1, $2, $3, $4, $5)
     on conflict (correo) do nothing
     returning id, nombre, apellido, correo, telefono`,
    [nombre, apellido, correo, telefono, passwordHash],
  )

  if (rows.length === 0) {
    throw new HttpError(409, 'Ya existe una cuenta con ese correo. Inicia sesión.', {
      correo: 'Ya existe una cuenta con ese correo',
    })
  }

  iniciarSesion(res, rows[0].id)
  res.status(201).json({ usuario: publico(rows[0]) })
})

router.post('/auth/login', limiteLogin, async (req, res) => {
  asegurarSesionConfigurada()

  const correo = correoDe(req)
  const password = typeof req.body?.password === 'string' ? req.body.password : ''

  if (!esCorreo(correo) || !password || password.length > 128) {
    throw new HttpError(401, 'Correo o contraseña incorrectos')
  }

  const { rows } = await pool.query(
    `select id, nombre, apellido, correo, telefono, password_hash, activo
       from usuarios where correo = $1`,
    [correo],
  )
  const usuario = rows[0]

  const coincide = await verifyPassword(password, usuario?.password_hash ?? HASH_RELLENO)
  if (!usuario || !usuario.activo || !usuario.password_hash || !coincide) {
    throw new HttpError(
      401,
      'Correo o contraseña incorrectos. Si aún no tienes cuenta, regístrate.',
    )
  }

  iniciarSesion(res, usuario.id)
  res.json({ usuario: publico(usuario) })
})

router.post('/auth/logout', (req, res) => {
  cerrarSesion(res)
  res.json({ ok: true })
})

router.get('/auth/me', async (req, res) => {
  const usuarioId = leerSesion(req)
  if (!usuarioId) return res.json({ usuario: null })

  const { rows } = await pool.query(
    `select id, nombre, apellido, correo, telefono from usuarios where id = $1 and activo`,
    [usuarioId],
  )
  res.json({ usuario: rows[0] ? publico(rows[0]) : null })
})

export default router
