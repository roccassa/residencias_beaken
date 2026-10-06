import { HttpError } from './errors.js'

// MP_API_URL solo se usa para probar con un servidor falso; en uso normal no se define.
const API = process.env.MP_API_URL ?? 'https://api.mercadopago.com'

function token() {
  const valor = process.env.MP_ACCESS_TOKEN
  if (!valor) throw new HttpError(503, 'Los pagos no están configurados en el servidor')
  return valor
}

async function llamar(ruta, opciones = {}) {
  let respuesta
  try {
    respuesta = await fetch(`${API}${ruta}`, {
      ...opciones,
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
        ...opciones.headers,
      },
      signal: AbortSignal.timeout(15000),
    })
  } catch (error) {
    if (error instanceof HttpError) throw error
    const causa = error.cause?.code ?? error.cause?.message ?? error.name
    console.error(`Mercado Pago no respondió (${ruta}): ${error.message} [${causa}]`)
    throw new HttpError(502, 'No pudimos comunicarnos con Mercado Pago. Intenta de nuevo.')
  }

  const cuerpo = await respuesta.json().catch(() => null)
  if (respuesta.status === 404) throw new HttpError(404, 'Pago no encontrado')
  if (!respuesta.ok) {
    console.error(`Mercado Pago ${respuesta.status} en ${ruta}:`, JSON.stringify(cuerpo))
    throw new HttpError(502, 'Mercado Pago rechazó la solicitud. Intenta de nuevo.')
  }
  return cuerpo
}

export const crearPreferencia = (datos, idempotencia) =>
  llamar('/checkout/preferences', {
    method: 'POST',
    headers: idempotencia ? { 'X-Idempotency-Key': idempotencia } : {},
    body: JSON.stringify(datos),
  })

export const obtenerPago = (id) => llamar(`/v1/payments/${encodeURIComponent(id)}`)

// Pagos de una inscripción (para cuando la persona pagó pero no volvió al sitio).
export async function buscarPagosPorReferencia(referencia) {
  const consulta = new URLSearchParams({
    external_reference: referencia,
    sort: 'date_created',
    criteria: 'desc',
  })
  const cuerpo = await llamar(`/v1/payments/search?${consulta}`)
  return cuerpo?.results ?? []
}
