import './CampoFormulario.css'

// Clase para el input, select o textarea que va dentro del campo
export const inputClass = 'campo__control'

export default function CampoFormulario({ label, htmlFor, required, error, hint, children }) {
  return (
    <div className="campo">
      <label htmlFor={htmlFor} className="campo__etiqueta">
        {label}
        {required && <span className="campo__requerido"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="campo__error">{error}</p>
      ) : (
        hint && <p className="campo__ayuda">{hint}</p>
      )}
    </div>
  )
}
