import { HttpError } from './errors.js'

// Límite de intentos en memoria: suficiente para una sola instancia del servidor.
export function limitador({ maximo, ventanaMs, clave }) {
  const intentos = new Map()

  return (req, res, next) => {
    const ahora = Date.now()

    if (intentos.size > 5000) {
      for (const [k, marcas] of intentos) {
        if (marcas.every((t) => ahora - t >= ventanaMs)) intentos.delete(k)
      }
    }

    const k = clave(req)
    const recientes = (intentos.get(k) ?? []).filter((t) => ahora - t < ventanaMs)

    if (recientes.length >= maximo) {
      res.set('Retry-After', String(Math.ceil(ventanaMs / 1000)))
      return next(new HttpError(429, 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'))
    }

    recientes.push(ahora)
    intentos.set(k, recientes)
    next()
  }
}
