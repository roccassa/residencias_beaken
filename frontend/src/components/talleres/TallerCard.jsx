const dayNumber = new Intl.DateTimeFormat('es', { day: '2-digit' })
const month = new Intl.DateTimeFormat('es', { month: 'short' })

export default function TallerCard({ taller }) {
  const fecha = new Date(taller.fechaInicio)

  return (
    <article className="tw:w-72 tw:shrink-0 tw:snap-start sm:tw:w-80">
      <div className="tw:relative tw:flex tw:aspect-video tw:items-center tw:justify-center tw:bg-neutral-200">
        <svg
          className="tw:size-10 tw:text-neutral-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>

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

      <a
        href="#"
        className="tw:mt-1 tw:inline-flex  tw:gap-1 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500"
      >
        Inscribirme
        <span aria-hidden="true">›</span>
      </a>
    </article>
  )
}
