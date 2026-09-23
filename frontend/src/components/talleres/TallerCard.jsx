import { Link } from 'react-router-dom'

const dayNumber = new Intl.DateTimeFormat('es', { day: '2-digit' })
const month = new Intl.DateTimeFormat('es', { month: 'short' })

export default function TallerCard({ taller }) {
  const fecha = new Date(taller.fechaInicio)

  return (
    <article className="tw:w-72 tw:shrink-0 tw:snap-start tw:sm:w-80">
      <div className="tw:relative tw:flex tw:aspect-video tw:items-center tw:justify-center tw:bg-neutral-200">
       {taller.imagen && (
          <img
            src={taller.imagen}
            alt={taller.titulo}
            className="tw:absolute tw:inset-0 tw:size-full tw:object-cover"
          />
        )}
        <div className="tw:absolute tw:right-3 tw:top-3 tw:rounded-md tw:bg-white tw:px-3 tw:py-1.5 tw:text-center tw:shadow-sm">
          <p className="tw:text-[10px] tw:font-medium tw:uppercase tw:text-neutral-500">
            {taller.duracion}
          </p>
          <p className="tw:text-lg tw:font-semibold tw:leading-tight tw:text-neutral-900">
            {dayNumber.format(fecha)}
          </p>
          <p className="tw:text-[10px] tw:text-neutral-500">
            {month.format(fecha)}
          </p>
        </div>
      </div>

      <span className="tw:mt-3 tw:inline-block tw:rounded-full tw:border tw:border-neutral-300 tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-medium tw:text-neutral-600">
        {taller.modalidad === 'presencial' ? 'Presencial' : 'Online'}
      </span>

      <h3 className="tw:mt-2 tw:font-semibold tw:text-neutral-900">
        {taller.titulo}
      </h3>
      <p className="tw:mt-1 tw:text-sm tw:text-neutral-600">
        {taller.descripcion}
      </p>

      <Link
        to={`/registro?actividad=${taller.id}`}
        className="tw:mt-1 tw:inline-flex tw:gap-1 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500"
      >
        Inscribirme
        <span aria-hidden="true">›</span>
      </Link>
    </article>
  )
}
