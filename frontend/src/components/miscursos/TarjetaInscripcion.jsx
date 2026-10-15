import { Link } from 'react-router-dom'
import { CalendarDays, Clock, Image as ImageIcon, MapPin } from 'lucide-react'
import BotonPagar from '../pagos/BotonPagar'
import './TarjetaInscripcion.css'

const fecha = new Intl.DateTimeFormat('es', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})
const hora = new Intl.DateTimeFormat('es', { hour: 'numeric', minute: '2-digit' })

const TIPOS = { curso: 'Curso', taller: 'Taller', evento: 'Evento' }

function estadoVisible({ estado, actividad }) {
  if (actividad.cancelada) return { texto: 'Actividad cancelada', clase: 'tarjeta-inscripcion__estado--cancelada' }
  if (actividad.finalizada) return { texto: 'Finalizada', clase: 'tarjeta-inscripcion__estado--finalizada' }
  if (estado === 'pendiente_pago') return { texto: 'Pago pendiente', clase: 'tarjeta-inscripcion__estado--pendiente' }
  if (estado === 'lista_espera') return { texto: 'Lista de espera', clase: 'tarjeta-inscripcion__estado--espera' }
  return { texto: 'Inscripción confirmada', clase: 'tarjeta-inscripcion__estado--confirmada' }
}

export default function TarjetaInscripcion({ inscripcion }) {
  const { actividad } = inscripcion
  const inicio = new Date(actividad.fechaInicio)
  const fin = new Date(actividad.fechaFin)
  const estado = estadoVisible(inscripcion)
  const apagada = actividad.finalizada || actividad.cancelada
  const porPagar = inscripcion.estado === 'pendiente_pago' && !apagada && actividad.costo > 0
  const precio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: actividad.moneda }).format(actividad.costo)

  return (
    <article className="tarjeta-inscripcion">
      <div
        className={`tarjeta-inscripcion__imagen${apagada ? ' tarjeta-inscripcion__imagen--apagada' : ''}`}
      >
        {actividad.imagen ? (
          <img src={actividad.imagen} alt="" className="tarjeta-inscripcion__foto" />
        ) : (
          <ImageIcon className="tarjeta-inscripcion__icono-imagen" aria-hidden="true" />
        )}
      </div>

      <div className="tarjeta-inscripcion__cuerpo">
        <p className="tarjeta-inscripcion__tipo">
          {TIPOS[actividad.tipo]}
        </p>
        <h3 className="tarjeta-inscripcion__titulo">
          {actividad.titulo}
        </h3>
        <p className="tarjeta-inscripcion__modalidad">
          {actividad.modalidad === 'presencial' ? 'Presencial' : 'Virtual'}
        </p>

        <p className="tarjeta-inscripcion__descripcion">
          {actividad.descripcion}
        </p>

        <ul className="tarjeta-inscripcion__datos">
          <li className="tarjeta-inscripcion__dato">
            <CalendarDays className="tarjeta-inscripcion__dato-icono" aria-hidden="true" />
            <span className="tarjeta-inscripcion__fecha">{fecha.format(inicio)}</span>
          </li>
          <li className="tarjeta-inscripcion__dato">
            <Clock className="tarjeta-inscripcion__dato-icono" aria-hidden="true" />
            {hora.format(inicio)} a {hora.format(fin)} ({actividad.duracion})
          </li>
          {actividad.ubicacion && (
            <li className="tarjeta-inscripcion__dato">
              <MapPin className="tarjeta-inscripcion__dato-icono" aria-hidden="true" />
              {actividad.ubicacion}
            </li>
          )}
        </ul>

        <span
          className={`tarjeta-inscripcion__estado ${estado.clase}`}
        >
          {estado.texto}
        </span>

        {porPagar && (
          <div className="tarjeta-inscripcion__pago">
            <p className="tarjeta-inscripcion__pago-texto">
              Costo: <span className="tarjeta-inscripcion__pago-precio">{precio}</span>. Págalo para confirmar tu lugar.
            </p>
            <div className="tarjeta-inscripcion__pago-acciones">
              <BotonPagar inscripcionId={inscripcion.id} />
              <Link
                to={`/pago/resultado?external_reference=${inscripcion.id}`}
                className="tarjeta-inscripcion__verificar"
              >
                Ya pagué, verificar
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
