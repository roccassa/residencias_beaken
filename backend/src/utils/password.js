import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)
const LONGITUD_CLAVE = 64

export async function hashPassword(password) {
  const sal = randomBytes(16)
  const hash = await scryptAsync(password, sal, LONGITUD_CLAVE)
  return `scrypt$${sal.toString('hex')}$${hash.toString('hex')}`
}

export async function verifyPassword(password, almacenado) {
  const [algoritmo, salHex, hashHex] = String(almacenado ?? '').split('$')
  if (algoritmo !== 'scrypt' || !salHex || !hashHex) return false

  const esperado = Buffer.from(hashHex, 'hex')
  const obtenido = await scryptAsync(password, Buffer.from(salHex, 'hex'), esperado.length)
  return timingSafeEqual(obtenido, esperado)
}

// Hash de relleno: se compara cuando el correo no existe, para que la respuesta
// tarde lo mismo y no revele si una cuenta existe.
export const HASH_RELLENO = await hashPassword(randomBytes(16).toString('hex'))
