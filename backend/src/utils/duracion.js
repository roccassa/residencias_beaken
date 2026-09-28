const HORA = 60 * 60 * 1000

export function formatDuracion(inicio, fin) {
  const horas = (new Date(fin) - new Date(inicio)) / HORA

  if (horas < 1) {
    const minutos = Math.round(horas * 60)
    return `${minutos} minutos`
  }
  if (horas >= 24) {
    const dias = Math.round(horas / 24)
    return dias === 1 ? '1 día' : `${dias} días`
  }

  const texto = Number.isInteger(horas) ? String(horas) : horas.toFixed(1)
  return horas === 1 ? '1 hora' : `${texto} horas`
}
