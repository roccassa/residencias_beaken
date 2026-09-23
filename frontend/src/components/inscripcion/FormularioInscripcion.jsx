import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cursos } from '../../data/cursos'
import { talleres } from '../../data/talleres'
import { eventos } from '../../data/eventos'
import SectionHeading from '../SectionHeading'

const grupos = [
  { label: 'Cursos', items: cursos },
  { label: 'Talleres', items: talleres },
  { label: 'Eventos', items: eventos },
]

const inputClass =
  'tw:w-full tw:rounded-md tw:border tw:border-neutral-300 tw:bg-white tw:px-3 tw:py-2.5 tw:text-sm tw:text-neutral-900 tw:placeholder:text-neutral-400 tw:focus:border-blue-600 tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-blue-600'

function Field({ label, htmlFor, required, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="tw:mb-1.5 tw:block tw:text-sm tw:font-medium tw:text-neutral-800">
        {label}
        {required && <span className="tw:text-rose-500"> *</span>}
      </label>
      {children}
    </div>
  )
}

const estaAgotada = (item) => item.inscritosConfirmados >= item.capacidadMaxima

export default function FormularioInscripcion() {
  const [enviado, setEnviado] = useState(false)
  const [searchParams] = useSearchParams()
  const actividadPreseleccionada = searchParams.get('actividad') || ''

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Registro"
        title="Aparta tu lugar hoy"
        description="Déjanos tus datos y te contactamos para confirmar tu inscripción al curso, taller o evento que elijas."
      />

      {enviado ? (
        <div
          role="status"
          className="tw:mt-10 tw:max-w-2xl tw:border tw:border-emerald-300 tw:bg-emerald-50 tw:p-6"
        >
          <h3 className="tw:font-semibold tw:text-emerald-900">
            ¡Gracias! Recibimos tu solicitud
          </h3>
          <p className="tw:mt-1 tw:text-sm tw:text-emerald-800">
            Te contactaremos por correo para confirmar tu inscripción.
          </p>
          <button
            type="button"
            onClick={() => setEnviado(false)}
            className="tw:mt-4 tw:text-sm tw:font-medium tw:text-emerald-900 tw:underline tw:underline-offset-4"
          >
            Enviar otra inscripción
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="tw:mt-10 tw:max-w-2xl tw:space-y-5">
          <div className="tw:grid tw:gap-5 tw:sm:grid-cols-2">
            <Field label="Nombre" htmlFor="nombre" required>
              <input id="nombre" name="nombre" type="text" required autoComplete="given-name" className={inputClass} />
            </Field>
            <Field label="Apellido" htmlFor="apellido">
              <input id="apellido" name="apellido" type="text" autoComplete="family-name" className={inputClass} />
            </Field>
            <Field label="Correo" htmlFor="correo" required>
              <input id="correo" name="correo" type="email" required autoComplete="email" className={inputClass} />
            </Field>
            <Field label="Teléfono" htmlFor="telefono">
              <input id="telefono" name="telefono" type="tel" autoComplete="tel" className={inputClass} />
            </Field>
          </div>

          <Field label="Elige un curso, taller o evento" htmlFor="actividad" required>
            <select
              id="actividad"
              name="actividad"
              required
              defaultValue={actividadPreseleccionada}
              className={inputClass}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {grupos.map((grupo) => (
                <optgroup key={grupo.label} label={grupo.label}>
                  {grupo.items.map((item) => (
                    <option key={item.id} value={item.id} disabled={estaAgotada(item)}>
                      {item.titulo}
                      {estaAgotada(item) ? ' (agotado)' : ''}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="Mensaje" htmlFor="mensaje">
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              placeholder="Escribe tu mensaje..."
              className={inputClass}
            />
          </Field>

          <label className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-neutral-700">
            <input type="checkbox" name="terminos" required className="tw:size-4 tw:accent-neutral-900" />
            Acepto los{' '}
            <a href="#" className="tw:underline tw:underline-offset-4">
              términos
            </a>
          </label>

          <button
            type="submit"
            className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
          >
            Enviar
          </button>
        </form>
      )}
    </section>
  )
}
