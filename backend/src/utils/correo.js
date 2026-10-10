import nodemailer from 'nodemailer'
import { pool } from '../db.js'
import { formatDuracion } from './duracion.js'
import { MINUTOS_RESERVA } from './cupos.js'

// Las actividades son de León, Guanajuato.
const ZONA = 'America/Mexico_City'
const fechaLarga = new Intl.DateTimeFormat('es-MX', { dateStyle: 'full', timeZone: ZONA })
const hora = new Intl.DateTimeFormat('es-MX', { timeStyle: 'short', timeZone: ZONA })
const TIPOS = { curso: 'Curso', taller: 'Taller', evento: 'Evento' }

const escapar = (valor) =>
  String(valor ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )

// Une las partes de una dirección sin repetir: se descarta la que ya aparece dentro de otra.
function unirSinRepetir(partes) {
  const limpias = partes.filter(Boolean).map((p) => p.trim())
  const minusculas = limpias.map((p) => p.toLowerCase())
  return limpias
    .filter((_, i) => !minusculas.some((otra, j) => j !== i && otra.includes(minusculas[i]) && (otra !== minusculas[i] || j < i)))
    .join(', ')
}

let transporte
function obtenerTransporte() {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env
  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASSWORD) return null

  transporte ??= nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT ?? 587),
    secure: Number(MAIL_PORT) === 465,
    auth: { user: MAIL_USER, pass: MAIL_PASSWORD },
  })
  return transporte
}

function armarCorreo(d) {
  const inicio = new Date(d.fecha_inicio)
  const fin = new Date(d.fecha_fin)
  const confirmada = d.estado === 'confirmada'
  const costo = Number(d.costo)
  const precio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: d.moneda }).format(costo)

  const lugar =
    d.modalidad === 'presencial'
      ? unirSinRepetir([d.lugar, d.direccion, d.ciudad])
      : 'Virtual'

  const filas = [
    ['Actividad', `${TIPOS[d.tipo] ?? d.tipo}: ${d.titulo}`],
    ['Fecha', fechaLarga.format(inicio)],
    ['Horario', `${hora.format(inicio)} a ${hora.format(fin)} (${formatDuracion(inicio, fin)})`],
    ['Lugar', lugar],
    ...(costo > 0 ? [['Costo', precio]] : []),
  ]

  const intro = confirmada
    ? 'Tu lugar quedó confirmado. Estos son los detalles de tu inscripción:'
    : `Recibimos tu inscripción, pero tu lugar todavía NO está confirmado: se confirma cuando se acredite el pago. Realízalo desde Mis cursos, en el sitio de Beaken; mientras tanto, tu cupo se guarda ${MINUTOS_RESERVA} minutos.`
  const asunto = confirmada
    ? `Inscripción confirmada: ${d.titulo}`
    : `Pago pendiente, aún sin confirmar: ${d.titulo}`
  const mapa = d.modalidad === 'presencial' && /^https?:\/\//.test(d.mapa_url ?? '') ? d.mapa_url : null

  const texto = [
    `Hola ${d.nombre},`,
    '',
    intro,
    '',
    ...filas.map(([k, v]) => `${k}: ${v}`),
    ...(mapa ? [`Mapa: ${mapa}`] : []),
    '',
    'Beaken',
  ].join('\n')

  const html = `<!doctype html>
<html lang="es"><body style="margin:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#102940">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e5e7eb">
      <tr><td style="padding:24px 28px;border-bottom:1px solid #e5e7eb;font-size:20px;font-weight:bold">Beaken</td></tr>
      <tr><td style="padding:28px">
        <p style="margin:0 0 12px;font-size:16px">Hola ${escapar(d.nombre)},</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.5">${escapar(intro)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-top:1px solid #e5e7eb">
          ${filas
            .map(
              ([k, v]) =>
                `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;width:90px;vertical-align:top">${escapar(k)}</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb">${escapar(v)}</td></tr>`,
            )
            .join('')}
        </table>
        ${mapa ? `<p style="margin:14px 0 0;font-size:14px"><a href="${escapar(mapa)}" style="color:#1d4ed8">Ver mapa</a></p>` : ''}
      </td></tr>
      <tr><td style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280">Recibes este correo porque te inscribiste en Beaken.</td></tr>
    </table>
  </td></tr></table>
</body></html>`

  return { asunto, texto, html }
}

// Correo con los detalles de una inscripción (confirmada, o pendiente de pago con su
// reserva). Nunca lanza: si el envío falla o no está configurado, solo queda en la
// consola del servidor, para que un problema de correo no tire la inscripción.
export async function enviarCorreoInscripcion(inscripcionId) {
  try {
    const transporte = obtenerTransporte()
    if (!transporte) {
      console.log('Correo no configurado (MAIL_HOST, MAIL_USER, MAIL_PASSWORD): se omite el envío')
      return false
    }

    const { rows } = await pool.query(
      `select i.estado, u.nombre, u.correo,
              a.titulo, a.tipo, a.modalidad, a.costo, a.moneda, a.fecha_inicio, a.fecha_fin,
              ub.nombre as lugar, ub.direccion, ub.ciudad, ub.mapa_url
         from inscripciones i
         join usuarios u on u.id = i.usuario_id
         join actividades a on a.id = i.actividad_id
         left join ubicaciones ub on ub.id = a.ubicacion_id
        where i.id = $1 and i.estado in ('confirmada', 'pendiente_pago')`,
      [inscripcionId],
    )
    if (!rows[0]) return false

    const { asunto, texto, html } = armarCorreo(rows[0])
    await transporte.sendMail({
      from: process.env.MAIL_FROM || 'Beaken <no-reply@beaken.demo>',
      to: rows[0].correo,
      subject: asunto,
      text: texto,
      html,
    })
    console.log(`Correo enviado (${asunto}) a ${rows[0].correo}`)
    return true
  } catch (error) {
    console.error('No se pudo enviar el correo de la inscripción:', error.code ?? '', error.message)
    return false
  }
}
