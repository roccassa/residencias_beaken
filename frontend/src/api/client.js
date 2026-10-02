const BASE = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  constructor(message, status, campos) {
    super(message)
    this.status = status
    this.campos = campos ?? {}
  }
}

async function request(path, options) {
  let respuesta
  try {
    respuesta = await fetch(`${BASE}${path}`, { credentials: 'include', ...options })
  } catch {
    throw new ApiError(
      'No pudimos conectar con el servidor. Intenta de nuevo en unos minutos.',
      0,
    )
  }

  const cuerpo = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    throw new ApiError(
      cuerpo?.error ?? 'Ocurrió un error inesperado',
      respuesta.status,
      cuerpo?.campos,
    )
  }
  return cuerpo
}

export const apiGet = (path) => request(path)

export const apiPost = (path, body) =>
  request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
