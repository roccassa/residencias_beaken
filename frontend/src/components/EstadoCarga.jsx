export default function EstadoCarga({ cargando, error }) {
  if (cargando) {
    return (
      <p role="status" className="tw:py-8 tw:text-center tw:text-neutral-500">
        Cargando…
      </p>
    )
  }
  if (error) {
    return (
      <p
        role="alert"
        className="tw:border tw:border-rose-200 tw:bg-rose-50 tw:p-6 tw:text-center tw:text-sm tw:text-rose-800"
      >
        {error.message}
      </p>
    )
  }
  return null
}
