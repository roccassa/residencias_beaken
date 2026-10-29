import './EstadoCarga.css'

export default function EstadoCarga({ cargando, error }) {
  if (cargando) {
    return (
      <p role="status" className="estado-carga estado-carga--cargando">
        <span className="estado-carga__texto">Cargando…</span>
        <span className="estado-carga__esqueleto" aria-hidden="true">
          <span className="estado-carga__bloque" />
          <span className="estado-carga__bloque" />
          <span className="estado-carga__bloque" />
        </span>
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
