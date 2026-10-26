// Las actividades son de León, Guanajuato: en el panel las fechas se leen y se escriben
// siempre en hora de México, sin importar la zona horaria del equipo de quien administra.
const ZONA = 'America/Mexico_City'

// México no tiene horario de verano desde 2022: la diferencia con UTC es siempre -06:00.
const DESFASE = '-06:00'

const partes = new Intl.DateTimeFormat('en-CA', {
  timeZone: ZONA,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

const fechaCorta = new Intl.DateTimeFormat('es-MX', {
  timeZone: ZONA,
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const fechaConHora = new Intl.DateTimeFormat('es-MX', {
  timeZone: ZONA,
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

// Fecha del servidor -> valor de un <input type="datetime-local"> ("2026-10-17T18:00").
export function aCampoFecha(iso) {
  if (!iso) return ''
  const p = Object.fromEntries(partes.formatToParts(new Date(iso)).map((x) => [x.type, x.value]))
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`
}

// Valor de un <input type="datetime-local"> -> fecha con zona para el servidor.
export function desdeCampoFecha(valor) {
  return valor ? `${valor}:00${DESFASE}` : null
}

export const formatoFecha = (iso) => fechaCorta.format(new Date(iso))
export const formatoFechaHora = (iso) => fechaConHora.format(new Date(iso))
