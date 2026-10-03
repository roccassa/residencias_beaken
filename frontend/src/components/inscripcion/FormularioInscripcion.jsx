import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { apiPost } from '../../api/client'
import { useAuth } from '../../auth/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import Field, { inputClass } from '../CampoFormulario'
import SectionHeading from '../SectionHeading'

const grupos = [
  { label: 'Cursos', tipo: 'curso' },
  { label: 'Talleres', tipo: 'taller' },
  { label: 'Eventos', tipo: 'evento' },
]

const botonClass =
  'tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700'

export default function FormularioInscripcion() {
  const { usuario, cargando, recargarUsuario } = useAuth()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [actividadId, setActividadId] = useState(searchParams.get('actividad') || '')
  const [resultado, setResultado] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const { data: actividades } = useFetch('/actividades')

  // Cuentas anteriores a que apellido y teléfono fueran obligatorios: se piden una vez.
  const faltaApellido = Boolean(usuario) && !usuario.apellido
  const faltaTelefono = Boolean(usuario) && !usuario.telefono

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setEnviando(true)
    setError(null)

    try {
      const respuesta = await apiPost('/inscripciones', {
        actividadId,
        mensaje: form.get('mensaje'),
        terminos: form.get('terminos') === 'on',
        ...(faltaApellido && { apellido: form.get('apellido') }),
        ...(faltaTelefono && {
          telefono: form.get('telefono'),
          telefonoConfirmacion: form.get('telefonoConfirmacion'),
        }),
      })
      setResultado(respuesta)
      if (faltaApellido || faltaTelefono) await recargarUsuario()
    } catch (err) {
      setError(err)
    } finally {
      setEnviando(false)
    }
  }

  const campos = error?.campos ?? {}
  const volver = encodeURIComponent(location.pathname + location.search)

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Registro"
        title="Aparta tu lugar hoy"
        description="Inicia sesión y elige el curso, taller o evento en el que quieres inscribirte; te contactamos para confirmar tu lugar."
      />

      {cargando ? (
        <p role="status" className="tw:mt-10 tw:text-neutral-500">
          Cargando…
        </p>
      ) : !usuario ? (
        <div className="tw:mt-10 tw:max-w-2xl tw:border tw:border-neutral-200 tw:bg-white tw:p-6">
          <h3 className="tw:font-semibold tw:text-neutral-900">
            Inicia sesión o crea tu cuenta para inscribirte
          </h3>
          <p className="tw:mt-1 tw:text-sm tw:text-neutral-600">
            Así tus inscripciones quedan ligadas a ti y puedes consultarlas en Mis cursos.
          </p>
          <div className="tw:mt-5 tw:flex tw:flex-wrap tw:gap-3">
            <Link to={`/login?volver=${volver}`} className={botonClass}>
              Iniciar sesión
            </Link>
            <Link
              to={`/login?modo=registro&volver=${volver}`}
              className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-100"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      ) : resultado ? (
        <div
          role="status"
          className="tw:mt-10 tw:max-w-2xl tw:border tw:border-emerald-300 tw:bg-emerald-50 tw:p-6"
        >
          <h3 className="tw:font-semibold tw:text-emerald-900">
            ¡Gracias! Recibimos tu solicitud
          </h3>
          <p className="tw:mt-1 tw:text-sm tw:text-emerald-800">{resultado.mensaje}</p>
          <p className="tw:mt-1 tw:text-sm tw:text-emerald-800">
            También puedes consultar los detalles en Mis cursos.
          </p>
          <div className="tw:mt-4 tw:flex tw:flex-wrap tw:gap-x-6 tw:gap-y-2 tw:text-sm tw:font-medium tw:text-emerald-900">
            <Link to="/mis-cursos" className="tw:underline tw:underline-offset-4">
              Ver mis cursos
            </Link>
            <button
              type="button"
              onClick={() => setResultado(null)}
              className="tw:cursor-pointer tw:underline tw:underline-offset-4"
            >
              Enviar otra inscripción
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="tw:mt-10 tw:max-w-2xl tw:space-y-5">
          <div className="tw:border tw:border-neutral-200 tw:bg-fondo-claro-secciones tw:p-4 tw:text-sm tw:text-neutral-700">
            <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-widest tw:text-slate-500">
              Te inscribes como
            </p>
            <p className="tw:mt-1 tw:font-medium tw:text-neutral-900">
              {usuario.nombre} {usuario.apellido}
            </p>
            <p>
              {usuario.correo}
              {usuario.telefono && ` · ${usuario.telefono}`}
            </p>
          </div>

          {(faltaApellido || faltaTelefono) && (
            <div className="tw:grid tw:gap-5 tw:sm:grid-cols-2">
              {faltaApellido && (
                <Field label="Apellido" htmlFor="apellido" required error={campos.apellido}>
                  <input id="apellido" name="apellido" type="text" required autoComplete="family-name" className={inputClass} />
                </Field>
              )}
              {faltaTelefono && (
                <>
                  <Field
                    label="Teléfono"
                    htmlFor="telefono"
                    required
                    error={campos.telefono}
                    hint="10 dígitos, o con lada internacional (+57…)"
                  >
                    <input id="telefono" name="telefono" type="tel" inputMode="tel" required autoComplete="tel" className={inputClass} />
                  </Field>
                  <Field
                    label="Confirma tu teléfono"
                    htmlFor="telefonoConfirmacion"
                    required
                    error={campos.telefonoConfirmacion}
                  >
                    <input
                      id="telefonoConfirmacion"
                      name="telefonoConfirmacion"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="off"
                      onPaste={(e) => e.preventDefault()}
                      className={inputClass}
                    />
                  </Field>
                </>
              )}
            </div>
          )}

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
            className={`${botonClass} tw:disabled:cursor-not-allowed tw:disabled:opacity-60`}
          >
            {enviando ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      )}
    </section>
  )
}
