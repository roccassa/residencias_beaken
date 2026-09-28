const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const esCorreo = (valor) =>
  typeof valor === 'string' && valor.length <= 255 && EMAIL.test(valor)

export const esUuid = (valor) => typeof valor === 'string' && UUID.test(valor)

export function textoOpcional(valor, maximo) {
  if (valor === undefined || valor === null) return { valor: null }
  if (typeof valor !== 'string') return { error: 'Debe ser texto' }
  const limpio = valor.trim()
  if (limpio.length > maximo) return { error: `Máximo ${maximo} caracteres` }
  return { valor: limpio === '' ? null : limpio }
}
