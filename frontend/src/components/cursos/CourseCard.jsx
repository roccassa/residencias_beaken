import { Link } from 'react-router-dom'

const dayName = new Intl.DateTimeFormat('es', { weekday: 'short' })
const monthYear = new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' })

const botonClass =
  'tw:shrink-0 tw:rounded-md tw:border tw:border-neutral-300 tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50'

export default function CourseCard({ curso }) {
  const fecha = new Date(curso.fechaInicio)
  const agotado = curso.inscritosConfirmados >= curso.capacidadMaxima

  return (
    <article className="tw:flex tw:flex-col tw:gap-4 tw:border tw:border-neutral-200 tw:p-6 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
      <div className="tw:flex tw:gap-6 tw:sm:items-center">
        <div className="tw:w-16 tw:shrink-0 tw:border-r tw:border-neutral-200 tw:pr-6 tw:text-center tw:sm:w-20">
          <p className="tw:text-xs tw:font-medium tw:uppercase tw:text-neutral-500">
            {dayName.format(fecha)}
          </p>
          <p className="tw:text-2xl tw:font-semibold tw:text-neutral-900">
            {fecha.getDate().toString().padStart(2, '0')}
          </p>
          <p className="tw:text-xs tw:text-neutral-500">{monthYear.format(fecha)}</p>
        </div>

        <div>
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <h3 className="tw:font-semibold tw:text-neutral-900">{curso.titulo}</h3>
            {agotado && (
              <span className="tw:rounded-full tw:bg-neutral-900 tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:text-white">
                Sold out
              </span>
            )}
          </div>
          <p className="tw:text-sm tw:text-neutral-500">
            {curso.modalidad === 'presencial' ? curso.ubicacion : 'Virtual'}
          </p>
          <p className="tw:mt-2 tw:max-w-xl tw:text-sm tw:text-neutral-600">
            {curso.descripcion}
          </p>
        </div>
      </div>

      {agotado ? (
        <button
          type="button"
          disabled
          className={`${botonClass} tw:cursor-not-allowed tw:border-neutral-200 tw:text-neutral-400 tw:hover:bg-transparent`}
        >
          Agotado
        </button>
      ) : (
        <Link to={`/registro?actividad=${curso.id}`} className={botonClass}>
          Inscribirme
        </Link>
      )}
    </article>
  )
}
