import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import Field, { inputClass } from '../CampoFormulario'

const TEXTOS = {
  login: {
    titulo: 'Inicia sesión',
    descripcion: 'Entra con tu correo para ver tus cursos, talleres y eventos.',
    boton: 'Iniciar sesión',
    pregunta: '¿Aún no tienes cuenta?',
    cambio: 'Regístrate',
    destino: '/login?modo=registro',
  },
  registro: {
    titulo: 'Crea tu cuenta',
    descripcion: 'Necesitamos tus datos para enviarte la confirmación de tu inscripción.',
    boton: 'Registrarse',
    pregunta: '¿Ya tienes cuenta?',
    cambio: 'Inicia sesión',
    destino: '/login',
  },
}

// Ruta interna a la que volver tras entrar (por ejemplo la inscripción a una actividad).
// Solo se aceptan rutas del propio sitio, nunca direcciones externas.
const rutaSegura = (valor) => (valor && valor.startsWith('/') && !valor.startsWith('//') ? valor : null)

export default function AuthCard() {
  const { usuario, cargando, login, registrar } = useAuth()
  const [searchParams] = useSearchParams()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  const modo = searchParams.get('modo') === 'registro' ? 'registro' : 'login'
  const textos = TEXTOS[modo]
  const campos = error?.campos ?? {}
  const volver = rutaSegura(searchParams.get('volver'))
  const destinoCambio = volver
    ? `${textos.destino}${textos.destino.includes('?') ? '&' : '?'}volver=${encodeURIComponent(volver)}`
    : textos.destino

  if (usuario) return <Navigate to={volver ?? '/mis-cursos'} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setEnviando(true)
    setError(null)

    try {
      if (modo === 'registro') {
        await registrar({
          nombre: form.get('nombre'),
          apellido: form.get('apellido'),
          correo: form.get('correo'),
          telefono: form.get('telefono'),
          telefonoConfirmacion: form.get('telefonoConfirmacion'),
          password: form.get('password'),
        })
      } else {
        await login({ correo: form.get('correo'), password: form.get('password') })
      }
    } catch (err) {
      setError(err)
      setEnviando(false)
    }
  }

  return (
    <section className="tw:relative tw:bg-fondo-claro-secciones tw:px-6 tw:py-16 tw:md:py-24">
      <Link
        to="/"
        aria-label="Cerrar"
        className="tw:absolute tw:right-6 tw:top-6 tw:text-neutral-700 tw:hover:text-neutral-950"
      >
        <X className="tw:size-6" />
      </Link>

      <div className="tw:mx-auto tw:max-w-md tw:border tw:border-neutral-200 tw:bg-white tw:p-8 tw:md:p-10">
        {cargando ? (
          <p role="status" className="tw:py-10 tw:text-center tw:text-neutral-500">
            Cargando…
          </p>
        ) : (
          <>
            <div className="tw:inline-flex tw:items-center tw:gap-2">
              <span className="tw:size-1.5 tw:shrink-0 tw:rounded-full tw:bg-rose-500" />
              <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-widest tw:text-slate-500">
                Cuenta
              </p>
            </div>
            <h1 className="tw:mt-3 tw:font-display tw:text-3xl tw:font-semibold tw:leading-tight tw:tracking-tight tw:text-fondo-oscuro-secciones">
              {textos.titulo}
            </h1>
            <p className="tw:mt-3 tw:text-neutral-600">{textos.descripcion}</p>

            <form key={modo} onSubmit={handleSubmit} className="tw:mt-8 tw:space-y-5">
              {modo === 'registro' && (
                <>
                  <Field label="Nombre" htmlFor="nombre" required error={campos.nombre}>
                    <input id="nombre" name="nombre" type="text" required autoComplete="given-name" className={inputClass} />
                  </Field>
                  <Field label="Apellido" htmlFor="apellido" required error={campos.apellido}>
                    <input id="apellido" name="apellido" type="text" required autoComplete="family-name" className={inputClass} />
                  </Field>
                </>
              )}

              <Field label="Correo" htmlFor="correo" required error={campos.correo}>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="email@example.com"
                  className={inputClass}
                />
              </Field>

              {modo === 'registro' && (
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

              <Field label="Contraseña" htmlFor="password" required error={campos.password}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={modo === 'registro' ? 8 : undefined}
                  autoComplete={modo === 'registro' ? 'new-password' : 'current-password'}
                  className={inputClass}
                />
                {modo === 'registro' && (
                  <p className="tw:mt-1 tw:text-xs tw:text-neutral-500">Mínimo 8 caracteres.</p>
                )}
              </Field>

              {error && Object.keys(campos).length === 0 && (
                <p
                  role="alert"
                  className="tw:border tw:border-rose-200 tw:bg-rose-50 tw:p-3 tw:text-sm tw:text-rose-800"
                >
                  {error.message}
                </p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="tw:w-full tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-3 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700 tw:disabled:cursor-not-allowed tw:disabled:opacity-60"
              >
                {enviando ? 'Un momento…' : textos.boton}
              </button>
            </form>

            <p className="tw:mt-6 tw:text-center tw:text-sm tw:text-neutral-600">
              {textos.pregunta}{' '}
              <Link
                to={destinoCambio}
                onClick={() => setError(null)}
                className="tw:font-medium tw:text-neutral-900 tw:underline tw:underline-offset-4"
              >
                {textos.cambio}
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  )
}
