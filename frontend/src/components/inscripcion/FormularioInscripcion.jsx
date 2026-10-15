import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { apiPost } from '../../api/client'
import { useAuth } from '../../auth/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import Field, { inputClass } from '../CampoFormulario'
import SectionHeading from '../SectionHeading'
import BotonPagar from '../pagos/BotonPagar'
import './FormularioInscripcion.css'

const grupos = [
  { label: 'Cursos', tipo: 'curso' },
  { label: 'Talleres', tipo: 'taller' },
  { label: 'Eventos', tipo: 'evento' },
]

const botonClass = 'boton'

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
    <section className="formulario-inscripcion">
      <SectionHeading
        label="Registro"
        title="Aparta tu lugar hoy"
        description="Inicia sesión y elige el curso, taller o evento en el que quieres inscribirte; te contactamos para confirmar tu lugar."
      />

      {cargando ? (
        <p role="status" className="formulario-inscripcion__cargando">
          Cargando…
        </p>
      ) : !usuario ? (
        <div className="formulario-inscripcion__acceso">
          <h3 className="formulario-inscripcion__acceso-titulo">
            Inicia sesión o crea tu cuenta para inscribirte
          </h3>
          <p className="formulario-inscripcion__acceso-texto">
            Así tus inscripciones quedan ligadas a ti y puedes consultarlas en Mis cursos.
          </p>
          <div className="formulario-inscripcion__acciones">
            <Link to={`/login?volver=${volver}`} className={botonClass}>
              Iniciar sesión
            </Link>
            <Link
              to={`/login?modo=registro&volver=${volver}`}
              className="boton boton--contorno formulario-inscripcion__boton-cuenta"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      ) : resultado ? (
        <div
          role="status"
          className="formulario-inscripcion__exito"
        >
          <h3 className="formulario-inscripcion__exito-titulo">
            ¡Gracias! Recibimos tu solicitud
          </h3>
          <p className="formulario-inscripcion__exito-texto">{resultado.mensaje}</p>
          <p className="formulario-inscripcion__exito-texto">
            También puedes consultar los detalles en Mis cursos.
          </p>
          {resultado.estado === 'pendiente_pago' && (
            <div className="formulario-inscripcion__pago">
              <p className="formulario-inscripcion__pago-texto">
                Tu lugar queda reservado 30 minutos. Paga ahora para confirmarlo.
              </p>
              <BotonPagar inscripcionId={resultado.id} />
            </div>
          )}
          <div className="formulario-inscripcion__exito-enlaces">
            <Link to="/mis-cursos" className="formulario-inscripcion__enlace">
              Ver mis cursos
            </Link>
            <button
              type="button"
              onClick={() => setResultado(null)}
              className="formulario-inscripcion__enlace"
            >
              Enviar otra inscripción
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="formulario-inscripcion__formulario">
          <div className="formulario-inscripcion__resumen">
            <p className="formulario-inscripcion__resumen-etiqueta">
              Te inscribes como
            </p>
            <p className="formulario-inscripcion__resumen-nombre">
              {usuario.nombre} {usuario.apellido}
            </p>
            <p>
              {usuario.correo}
              {usuario.telefono && ` · ${usuario.telefono}`}
            </p>
          </div>

          {(faltaApellido || faltaTelefono) && (
            <div className="formulario-inscripcion__datos-faltantes">
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
            <label className="formulario-inscripcion__terminos">
              <input type="checkbox" name="terminos" required className="formulario-inscripcion__casilla" />
              Acepto los{' '}
              <a href="#" className="formulario-inscripcion__enlace">
                términos
              </a>
            </label>
            {campos.terminos && <p className="formulario-inscripcion__error-campo">{campos.terminos}</p>}
          </div>

          {error && (
            <p
              role="alert"
              className="formulario-inscripcion__error"
            >
              {error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="boton"
          >
            {enviando ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      )}
    </section>
  )
}
