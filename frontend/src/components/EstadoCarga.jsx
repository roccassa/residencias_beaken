import './EstadoCarga.css'

export default function EstadoCarga({ cargando, error }) {
  if (cargando) {
    return (
      <p role="status" className="estado-carga estado-carga--cargando">
        Cargando…
      </p>
    )
  }
  if (error) {
    return (
      <p role="alert" className="estado-carga estado-carga--error">
        {error.message}
      </p>
    )
  }
  return null
}
