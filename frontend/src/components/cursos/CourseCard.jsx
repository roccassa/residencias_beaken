const dayName = new Intl.DateTimeFormat('es', { weekday: 'short' })
const monthYear = new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' })

export default function CourseCard({ curso }) {
  const fecha = new Date(curso.fechaInicio)
  const agotado = curso.inscritosConfirmados >= curso.capacidadMaxima

  return (
    <article className="flex flex-col gap-4 border border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-6 sm:items-center">
        <div className="w-16 shrink-0 border-r border-neutral-200 pr-6 text-center sm:w-20">
          <p className="text-xs font-medium uppercase text-neutral-500">
            {dayName.format(fecha)}
          </p>
          <p className="text-2xl font-semibold text-neutral-900">
            {fecha.getDate().toString().padStart(2, '0')}
          </p>
          <p className="text-xs text-neutral-500">{monthYear.format(fecha)}</p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-neutral-900">{curso.titulo}</h3>
            {agotado && (
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
                Sold out
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500">
            {curso.modalidad === 'presencial' ? curso.ubicacion : 'Virtual'}
          </p>
          <p className="mt-2 max-w-xl text-sm text-neutral-600">
            {curso.descripcion}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={agotado}
        className="shrink-0 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400 disabled:hover:bg-transparent"
      >
        {agotado ? 'Agotado' : 'Save my spot'}
      </button>
    </article>
  )
}
