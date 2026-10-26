import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { inputClass } from '../CampoFormulario'
import EstadoCarga from '../EstadoCarga'
import DetalleUsuario from './DetalleUsuario'
import './PanelAdmin.css'
import './TablaUsuarios.css'

// Lista de personas registradas con búsqueda por nombre o correo. Al elegir una se abre
// su ficha al lado (en pantallas pequeñas, debajo). La persona elegida va en la dirección
// (?usuario=...) para poder recargar la página sin perderla.
export default function TablaUsuarios() {
  const { data, cargando, error } = useFetch('/admin/usuarios')
  const [cambios, setCambios] = useState({})
  const [busqueda, setBusqueda] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const elegido = searchParams.get('usuario')

  // Lo guardado en la ficha se refleja en la lista sin volver a pedirla.
  const usuarios = useMemo(() => (data ?? []).map((u) => ({ ...u, ...cambios[u.id] })), [data, cambios])

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return usuarios
    return usuarios.filter((u) =>
      [`${u.nombre} ${u.apellido ?? ''}`, u.correo].some((valor) => valor.toLowerCase().includes(texto)),
    )
  }, [usuarios, busqueda])

  const elegir = (id) => setSearchParams(id ? { usuario: id } : {})

  return (
    <section>
      <div className="panel-admin__encabezado">
        <h1 className="panel-admin__titulo">Usuarios</h1>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar nombre o correo…"
          aria-label="Buscar nombre o correo"
          className={`${inputClass} tabla-usuarios__busqueda`}
        />
      </div>

      <div className={`tabla-usuarios${elegido ? ' tabla-usuarios--con-detalle' : ''}`}>
        <div className="panel-admin__caja tabla-usuarios__lista">
          <EstadoCarga cargando={cargando} error={error} />

          {data && filtrados.length === 0 && (
            <p className="panel-admin__vacio">
              {usuarios.length === 0 ? 'Todavía no hay usuarios registrados.' : 'Nadie coincide con la búsqueda.'}
            </p>
          )}

          {filtrados.length > 0 && (
            <div className="tabla-admin__marco">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => elegir(u.id)}
                      className={`tabla-admin__fila--clic${u.id === elegido ? ' tabla-admin__fila--seleccionada' : ''}`}
                    >
                      <td>
                        <button
                          type="button"
                          onClick={() => elegir(u.id)}
                          aria-pressed={u.id === elegido}
                          className="tabla-usuarios__nombre"
                        >
                          {u.nombre} {u.apellido}
                        </button>
                      </td>
                      <td>{u.correo}</td>
                      <td>
                        {u.rol === 'admin' ? (
                          <span className="etiqueta-estado etiqueta-estado--admin">Admin</span>
                        ) : (
                          'Usuario'
                        )}
                      </td>
                      <td>
                        <span className={`etiqueta-estado etiqueta-estado--${u.activo ? 'activo' : 'inactivo'}`}>
                          {u.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {elegido && (
          <DetalleUsuario
            key={elegido}
            id={elegido}
            onCerrar={() => elegir(null)}
            onGuardado={(u) => setCambios((c) => ({ ...c, [u.id]: u }))}
          />
        )}
      </div>
    </section>
  )
}
