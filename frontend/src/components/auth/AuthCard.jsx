import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import Field, { inputClass } from '../CampoFormulario'
import './AuthCard.css'

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

  // Sin ruta a la que volver: el administrador va a su panel y los demás a Mis cursos.
  if (usuario) {
    const inicio = usuario.rol === 'admin' ? '/admin' : '/mis-cursos'
    return <Navigate to={volver ?? inicio} replace />
  }

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
    <section className="acceso">
      <Link
        to="/"
        aria-label="Cerrar"
        className="acceso__cerrar"
      >
        <X className="acceso__cerrar-icono" />
      </Link>

      <div className="acceso__tarjeta">
        {cargando ? (
          <p role="status" className="acceso__cargando">
            Cargando…
          </p>
        ) : (
          <>
            <div className="acceso__marca">
              <span className="acceso__punto" />
              <p className="acceso__etiqueta">
                Cuenta
              </p>
            </div>
            <h1 className="acceso__titulo">
              {textos.titulo}
            </h1>
            <p className="acceso__descripcion">{textos.descripcion}</p>

            <form key={modo} onSubmit={handleSubmit} className="acceso__formulario">
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
                  <p className="campo__ayuda">Mínimo 8 caracteres.</p>
                )}
              </Field>

              {error && Object.keys(campos).length === 0 && (
                <p
                  role="alert"
                  className="acceso__error"
                >
                  {error.message}
                </p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="boton boton--ancho"
              >
                {enviando ? 'Un momento…' : textos.boton}
              </button>
            </form>

            <p className="acceso__cambio">
              {textos.pregunta}{' '}
              <Link
                to={destinoCambio}
                onClick={() => setError(null)}
                className="acceso__cambio-enlace"
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
