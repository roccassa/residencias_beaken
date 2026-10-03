const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const esCorreo = (valor) =>
  typeof valor === 'string' && valor.length <= 255 && EMAIL.test(valor)

export const esUuid = (valor) => typeof valor === 'string' && UUID.test(valor)

// Devuelve el teléfono en un formato único para poder compararlo: 10 dígitos
// (México, aceptando +52 / 52 / 521 delante) o "+" y lada para otros países.
// Si no es un teléfono plausible, devuelve null.
export function normalizarTelefono(valor) {
  if (typeof valor !== 'string') return null

  const limpio = valor.trim().replace(/[\s().-]/g, '')
  if (!/^\+?\d{10,15}$/.test(limpio)) return null

  const digitos = limpio.replace('+', '')
  const mexico = digitos.match(/^521?(\d{10})$/)
  if (mexico) return mexico[1]

  return limpio.startsWith('+') ? `+${digitos}` : digitos
}

export function textoOpcional(valor, maximo) {
  if (valor === undefined || valor === null) return { valor: null }
  if (typeof valor !== 'string') return { error: 'Debe ser texto' }
  const limpio = valor.trim()
  if (limpio.length > maximo) return { error: `Máximo ${maximo} caracteres` }
  return { valor: limpio === '' ? null : limpio }
}
