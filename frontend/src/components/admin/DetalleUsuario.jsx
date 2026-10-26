import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { apiGet, apiPut } from '../../api/client'
import { useAuth } from '../../auth/AuthContext'
import { formatoFecha } from '../../utils/fechaMexico'
import Field, { inputClass } from '../CampoFormulario'
import EstadoCarga from '../EstadoCarga'
import './PanelAdmin.css'
import './DetalleUsuario.css'

const ESTADOS_INSCRIPCION = {
  confirmada: 'confirmada',
  pendiente_pago: 'pago pendiente',
  lista_espera: 'lista de espera',
  cancelada: 'cancelada',
  reembolsada: 'reembolsada',
}

// Ficha de una persona: datos editables, rol, cuenta activa o no, y sus inscripciones
// (solo lectura). Los usuarios no se borran: se desactivan y ya no pueden iniciar sesión.
export default function DetalleUsuario({ id, onGuardado, onCerrar }) {
  const { usuario: yo, recargarUsuario } = useAuth()
  const [detalle, setDetalle] = useState(null)
  const [datos, setDatos] = useState(null)
  const [errorCarga, setErrorCarga] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [guardado, setGuardado] = useState(false)
  const campos = error?.campos ?? {}
  const soyYo = yo.id === id
  const refFicha = useRef(null)

  // Por debajo de 1100 px la ficha queda bajo la lista: ya cargada, se baja hasta ella para que se vea.
  const cargada = detalle !== null
  useEffect(() => {
    if (cargada && !window.matchMedia('(min-width: 1100px)').matches) {
      refFicha.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [cargada])

  useEffect(() => {
    let cancelado = false
    apiGet(`/admin/usuarios/${id}`)
      .then((u) => {
        if (cancelado) return
        setDetalle(u)
        setDatos({
          nombre: u.nombre,
          apellido: u.apellido ?? '',
          telefono: u.telefono ?? '',
          rol: u.rol,
          activo: u.activo ? 'si' : 'no',
        })
      })
      .catch((err) => !cancelado && setErrorCarga(err))
    return () => {
      cancelado = true
    }
  }, [id])

  const alEscribir = (campo) => (e) => {
    setGuardado(false)
    setDatos((d) => ({ ...d, [campo]: e.target.value }))
  }

  async function guardar(e) {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    setGuardado(false)
    try {
      const actualizado = await apiPut(`/admin/usuarios/${id}`, {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        rol: datos.rol,
        activo: datos.activo === 'si',
      })
      setDetalle((d) => ({ ...d, ...actualizado }))
      setGuardado(true)
      onGuardado(actualizado)
      if (soyYo) await recargarUsuario()
    } catch (err) {
      setError(err)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <aside ref={refFicha} className="detalle-usuario" aria-label="Detalle del usuario">
      <button type="button" onClick={onCerrar} aria-label="Cerrar detalle" className="detalle-usuario__cerrar">
        <X className="detalle-usuario__cerrar-icono" aria-hidden="true" />
      </button>

      {!detalle ? (
        <EstadoCarga cargando={!errorCarga} error={errorCarga} />
      ) : (
        <form onSubmit={guardar} className="detalle-usuario__formulario">
          <div>
            <h2 className="detalle-usuario__nombre">
              {detalle.nombre} {detalle.apellido}
            </h2>
            <p className="detalle-usuario__correo">{detalle.correo}</p>
            {detalle.fechaRegistro && (
              <p className="detalle-usuario__registro">Registrado el {formatoFecha(detalle.fechaRegistro)}</p>
            )}
          </div>

          <div className="detalle-usuario__dos">
            <Field label="Nombre" htmlFor="u-nombre" required error={campos.nombre}>
              <input id="u-nombre" value={datos.nombre} onChange={alEscribir('nombre')} required maxLength={100} className={inputClass} />
            </Field>
            <Field label="Apellido" htmlFor="u-apellido" error={campos.apellido}>
              <input id="u-apellido" value={datos.apellido} onChange={alEscribir('apellido')} maxLength={100} className={inputClass} />
            </Field>
          </div>

          <Field label="Teléfono" htmlFor="u-telefono" error={campos.telefono} hint="10 dígitos, o con lada internacional (+57…)">
            <input id="u-telefono" type="tel" value={datos.telefono} onChange={alEscribir('telefono')} className={inputClass} />
          </Field>

          <div className="detalle-usuario__dos">
            <Field label="Rol" htmlFor="u-rol" error={campos.rol}>
              <select id="u-rol" value={datos.rol} onChange={alEscribir('rol')} disabled={soyYo} className={inputClass}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </Field>
            <Field label="Cuenta" htmlFor="u-activo" error={campos.activo}>
              <select id="u-activo" value={datos.activo} onChange={alEscribir('activo')} disabled={soyYo} className={inputClass}>
                <option value="si">Activa</option>
                <option value="no">Desactivada</option>
              </select>
            </Field>
          </div>
          {soyYo ? (
            <p className="detalle-usuario__nota">Es tu cuenta: no puedes quitarte el rol de administrador ni desactivarla.</p>
          ) : (
            datos.activo === 'no' && (
              <p className="detalle-usuario__nota">Una cuenta desactivada no puede iniciar sesión. Su historial se conserva.</p>
            )
          )}

          <div>
            <p className="detalle-usuario__subtitulo">Inscripciones</p>
            {detalle.inscripciones.length === 0 ? (
              <p className="detalle-usuario__nota">Sin inscripciones.</p>
            ) : (
              <ul className="detalle-usuario__inscripciones">
                {detalle.inscripciones.map((i) => (
                  <li key={i.id} className="detalle-usuario__inscripcion">
                    <span className="detalle-usuario__actividad">{i.actividad.titulo}</span>
                    <span className="detalle-usuario__inscripcion-dato">
                      {formatoFecha(i.actividad.fechaInicio)} · {ESTADOS_INSCRIPCION[i.estado] ?? i.estado}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && (
            <p role="alert" className="panel-admin__aviso panel-admin__aviso--error">
              {error.message}
            </p>
          )}
          {guardado && (
            <p role="status" className="panel-admin__aviso panel-admin__aviso--exito">
              Cambios guardados.
            </p>
          )}

          <button type="submit" disabled={enviando} className="boton detalle-usuario__guardar">
            {enviando ? 'Guardando…' : 'Guardar'}
          </button>
        </form>
      )}
    </aside>
  )
}
