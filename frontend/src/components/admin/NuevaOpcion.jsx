import { useState } from 'react'
import { apiPost } from '../../api/client'
import Field, { inputClass } from '../CampoFormulario'
import './NuevaOpcion.css'

// Mini formulario para crear una categoría, ubicación o instructor sin salir del
// formulario de la actividad. No es un <form> (no se pueden anidar formularios):
// Enter en un campo crea la opción en lugar de enviar el formulario de la actividad.
//   campos: [{ name, label, required, hint }]
//   extra:  datos fijos que se envían junto con los campos (por ejemplo el tipo)
export default function NuevaOpcion({ titulo, ruta, campos, extra, onCreada, onCerrar }) {
  const [valores, setValores] = useState(() => Object.fromEntries(campos.map((c) => [c.name, ''])))
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const errores = error?.campos ?? {}

  async function crear() {
    setEnviando(true)
    setError(null)
    try {
      onCreada(await apiPost(ruta, { ...valores, ...extra }))
    } catch (err) {
      setError(err)
      setEnviando(false)
    }
  }

  function alPresionarTecla(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      crear()
    }
    if (e.key === 'Escape') onCerrar()
  }

  return (
    <div className="nueva-opcion" onKeyDown={alPresionarTecla}>
      <p className="nueva-opcion__titulo">{titulo}</p>

      {campos.map((c, i) => (
        <Field
          key={c.name}
          label={c.label}
          htmlFor={`nueva-${ruta}-${c.name}`}
          required={c.required}
          error={errores[c.name]}
          hint={c.hint}
        >
          <input
            id={`nueva-${ruta}-${c.name}`}
            value={valores[c.name]}
            onChange={(e) => setValores((v) => ({ ...v, [c.name]: e.target.value }))}
            autoFocus={i === 0}
            className={inputClass}
          />
        </Field>
      ))}

      {error && Object.keys(errores).length === 0 && (
        <p role="alert" className="nueva-opcion__error">
          {error.message}
        </p>
      )}

      <div className="nueva-opcion__acciones">
        <button type="button" onClick={onCerrar} className="boton boton--contorno boton--compacto">
          Cancelar
        </button>
        <button type="button" onClick={crear} disabled={enviando} className="boton boton--compacto">
          {enviando ? 'Creando…' : 'Crear'}
        </button>
      </div>
    </div>
  )
}
