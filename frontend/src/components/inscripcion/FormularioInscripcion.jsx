import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiPost } from '../../api/client'
import { useFetch } from '../../hooks/useFetch'
import SectionHeading from '../SectionHeading'

const grupos = [
  { label: 'Cursos', tipo: 'curso' },
  { label: 'Talleres', tipo: 'taller' },
  { label: 'Eventos', tipo: 'evento' },
]

const inputClass =
  'tw:w-full tw:rounded-md tw:border tw:border-neutral-300 tw:bg-white tw:px-3 tw:py-2.5 tw:text-sm tw:text-neutral-900 tw:placeholder:text-neutral-400 tw:focus:border-blue-600 tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-blue-600'

function Field({ label, htmlFor, required, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="tw:mb-1.5 tw:block tw:text-sm tw:font-medium tw:text-neutral-800">
        {label}
        {required && <span className="tw:text-rose-500"> *</span>}
      </label>
      {children}
      {error && <p className="tw:mt-1 tw:text-xs tw:text-rose-600">{error}</p>}
    </div>
  )
}

export default function FormularioInscripcion() {
  const [searchParams] = useSearchParams()
  const [actividadId, setActividadId] = useState(searchParams.get('actividad') || '')
  const [resultado, setResultado] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const { data: actividades } = useFetch('/actividades')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setEnviando(true)
    setError(null)

    try {
      const respuesta = await apiPost('/inscripciones', {
        nombre: form.get('nombre'),
        apellido: form.get('apellido'),
        correo: form.get('correo'),
        telefono: form.get('telefono'),
        actividadId,
        mensaje: form.get('mensaje'),
        terminos: form.get('terminos') === 'on',
      })
      setResultado(respuesta)
    } catch (err) {
      setError(err)
    } finally {
      setEnviando(false)
    }
  }

  const campos = error?.campos ?? {}

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Registro"
        title="Aparta tu lugar hoy"
        description="Déjanos tus datos y te contactamos para confirmar tu inscripción al curso, taller o evento que elijas."
      />

      {resultado ? (
        <div
          role="status"
          className="tw:mt-10 tw:max-w-2xl tw:border tw:border-emerald-300 tw:bg-emerald-50 tw:p-6"
        >
          <h3 className="tw:font-semibold tw:text-emerald-900">
            ¡Gracias! Recibimos tu solicitud
          </h3>
          <p className="tw:mt-1 tw:text-sm tw:text-emerald-800">{resultado.mensaje}</p>
          <button
            type="button"
            onClick={() => setResultado(null)}
            className="tw:mt-4 tw:text-sm tw:font-medium tw:text-emerald-900 tw:underline tw:underline-offset-4"
          >
            Enviar otra inscripción
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="tw:mt-10 tw:max-w-2xl tw:space-y-5">
          <div className="tw:grid tw:gap-5 tw:sm:grid-cols-2">
            <Field label="Nombre" htmlFor="nombre" required error={campos.nombre}>
              <input id="nombre" name="nombre" type="text" required autoComplete="given-name" className={inputClass} />
            </Field>
            <Field label="Apellido" htmlFor="apellido" error={campos.apellido}>
              <input id="apellido" name="apellido" type="text" autoComplete="family-name" className={inputClass} />
            </Field>
            <Field label="Correo" htmlFor="correo" required error={campos.correo}>
              <input id="correo" name="correo" type="email" required autoComplete="email" className={inputClass} />
            </Field>
            <Field label="Teléfono" htmlFor="telefono" error={campos.telefono}>
              <input id="telefono" name="telefono" type="tel" autoComplete="tel" className={inputClass} />
            </Field>
          </div>

          <Field label="Elige un curso, taller o evento" htmlFor="actividad" required error={campos.actividadId}>
            <select
              id="actividad"
              name="actividad"
              required
              value={actividadId}
              onChange={(e) => setActividadId(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {grupos.map((grupo) => (
                <optgroup key={grupo.tipo} label={grupo.label}>
                  {(actividades ?? [])
                    .filter((actividad) => actividad.tipo === grupo.tipo)
                    .map((actividad) => (
                      <option key={actividad.id} value={actividad.id} disabled={actividad.agotada}>
                        {actividad.titulo}
                        {actividad.agotada ? ' (agotado)' : ''}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="Mensaje" htmlFor="mensaje" error={campos.mensaje}>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              placeholder="Escribe tu mensaje..."
              className={inputClass}
            />
          </Field>

          <div>
            <label className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-neutral-700">
              <input type="checkbox" name="terminos" required className="tw:size-4 tw:accent-neutral-900" />
              Acepto los{' '}
              <a href="#" className="tw:underline tw:underline-offset-4">
                términos
              </a>
            </label>
            {campos.terminos && <p className="tw:mt-1 tw:text-xs tw:text-rose-600">{campos.terminos}</p>}
          </div>

          {error && (
            <p
              role="alert"
              className="tw:border tw:border-rose-200 tw:bg-rose-50 tw:p-4 tw:text-sm tw:text-rose-800"
            >
              {error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700 tw:disabled:cursor-not-allowed tw:disabled:opacity-60"
          >
            {enviando ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      )}
    </section>
  )
}
