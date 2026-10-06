import { Link } from 'react-router-dom'
import { CalendarDays, Clock, Image as ImageIcon, MapPin } from 'lucide-react'
import BotonPagar from '../pagos/BotonPagar'

const fecha = new Intl.DateTimeFormat('es', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})
const hora = new Intl.DateTimeFormat('es', { hour: 'numeric', minute: '2-digit' })

const TIPOS = { curso: 'Curso', taller: 'Taller', evento: 'Evento' }

function estadoVisible({ estado, actividad }) {
  if (actividad.cancelada) return { texto: 'Actividad cancelada', clase: 'tw:bg-rose-100 tw:text-rose-800' }
  if (actividad.finalizada) return { texto: 'Finalizada', clase: 'tw:bg-neutral-200 tw:text-neutral-700' }
  if (estado === 'pendiente_pago') return { texto: 'Pago pendiente', clase: 'tw:bg-amber-100 tw:text-amber-800' }
  if (estado === 'lista_espera') return { texto: 'Lista de espera', clase: 'tw:bg-sky-100 tw:text-sky-800' }
  return { texto: 'Inscripción confirmada', clase: 'tw:bg-emerald-100 tw:text-emerald-800' }
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
    <article className="tw:flex tw:flex-col tw:gap-5 tw:sm:flex-row">
      <div
        className={`tw:flex tw:aspect-square tw:w-full tw:shrink-0 tw:items-center tw:justify-center tw:overflow-hidden tw:bg-neutral-200 tw:sm:size-44 tw:sm:w-44 ${
          apagada ? 'tw:opacity-60' : ''
        }`}
      >
        {actividad.imagen ? (
          <img src={actividad.imagen} alt="" className="tw:size-full tw:object-cover" />
        ) : (
          <ImageIcon className="tw:size-10 tw:text-neutral-400" aria-hidden="true" />
        )}
      </div>

      <div className="tw:min-w-0">
        <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-widest tw:text-slate-500">
          {TIPOS[actividad.tipo]}
        </p>
        <h3 className="tw:mt-1 tw:text-xl tw:font-semibold tw:text-neutral-900">
          {actividad.titulo}
        </h3>
        <p className="tw:mt-0.5 tw:text-neutral-600">
          {actividad.modalidad === 'presencial' ? 'Presencial' : 'Virtual'}
        </p>

        <p className="tw:mt-3 tw:line-clamp-3 tw:text-sm tw:text-neutral-600">
          {actividad.descripcion}
        </p>

        <ul className="tw:mt-3 tw:space-y-1 tw:text-sm tw:text-neutral-700">
          <li className="tw:flex tw:items-center tw:gap-2">
            <CalendarDays className="tw:size-4 tw:shrink-0 tw:text-neutral-500" aria-hidden="true" />
            <span className="tw:capitalize">{fecha.format(inicio)}</span>
          </li>
          <li className="tw:flex tw:items-center tw:gap-2">
            <Clock className="tw:size-4 tw:shrink-0 tw:text-neutral-500" aria-hidden="true" />
            {hora.format(inicio)} a {hora.format(fin)} ({actividad.duracion})
          </li>
          {actividad.ubicacion && (
            <li className="tw:flex tw:items-center tw:gap-2">
              <MapPin className="tw:size-4 tw:shrink-0 tw:text-neutral-500" aria-hidden="true" />
              {actividad.ubicacion}
            </li>
          )}
        </ul>

        <span
          className={`tw:mt-4 tw:inline-block tw:rounded-full tw:px-3 tw:py-1 tw:text-xs tw:font-medium ${estado.clase}`}
        >
          {estado.texto}
        </span>

        {porPagar && (
          <div className="tw:mt-4">
            <p className="tw:mb-3 tw:text-sm tw:text-neutral-700">
              Costo: <span className="tw:font-medium">{precio}</span>. Págalo para confirmar tu lugar.
            </p>
            <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-x-5 tw:gap-y-3">
              <BotonPagar inscripcionId={inscripcion.id} />
              <Link
                to={`/pago/resultado?external_reference=${inscripcion.id}`}
                className="tw:self-center tw:text-sm tw:text-neutral-700 tw:underline tw:underline-offset-4"
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
