import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useFetch } from '../../hooks/useFetch'
import { formatoFecha } from '../../utils/fechaMexico'
import { inputClass } from '../CampoFormulario'
import EstadoCarga from '../EstadoCarga'
import { COSTOS, ESTADOS, TIPOS } from './etiquetas'
import './PanelAdmin.css'

const formatoMoneda = (moneda, monto) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: moneda }).format(monto)
const formatoCosto = (a) => (a.costo === 0 ? 'Gratis' : formatoMoneda(a.moneda, a.costo))

// Todas las actividades (también las pasadas, los borradores y las canceladas),
// con búsqueda por título y filtros por tipo, estado y costo (gratis o de pago).
export default function TablaActividades() {
  const { state } = useLocation()
  const { data: actividades, cargando, error } = useFetch('/admin/actividades')
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('')
  const [estado, setEstado] = useState('')
  const [costo, setCosto] = useState('')

  const filtradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return (actividades ?? []).filter(
      (a) =>
        (!texto || a.titulo.toLowerCase().includes(texto)) &&
        (!tipo || a.tipo === tipo) &&
        (!estado || a.estado === estado) &&
        (!costo || (costo === 'gratis') === (a.costo === 0)),
    )
  }, [actividades, busqueda, tipo, estado, costo])

  return (
    <section>
      <div className="panel-admin__encabezado">
        <h1 className="panel-admin__titulo">Actividades</h1>
        <Link to="/admin/actividades/nueva" className="boton boton--cabecera">
          <Plus className="panel-admin__boton-icono" aria-hidden="true" />
          Nueva actividad
        </Link>
      </div>

      {state?.aviso && (
        <p role="status" className="panel-admin__aviso panel-admin__aviso--exito">
          {state.aviso}
        </p>
      )}

      <div className="panel-admin__filtros">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por título…"
          aria-label="Buscar por título"
          className={inputClass}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Tipo" className={inputClass}>
          <option value="">Todos los tipos</option>
          {Object.entries(TIPOS).map(([valor, texto]) => (
            <option key={valor} value={valor}>
              {texto}
            </option>
          ))}
        </select>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Estado" className={inputClass}>
          <option value="">Todos los estados</option>
          {Object.entries(ESTADOS).map(([valor, texto]) => (
            <option key={valor} value={valor}>
              {texto}
            </option>
          ))}
        </select>
        <select value={costo} onChange={(e) => setCosto(e.target.value)} aria-label="Costo" className={inputClass}>
          <option value="">Gratis y de pago</option>
          {Object.entries(COSTOS).map(([valor, texto]) => (
            <option key={valor} value={valor}>
              {texto}
            </option>
          ))}
        </select>
      </div>

      <div className="panel-admin__caja">
        <EstadoCarga cargando={cargando} error={error} />

        {actividades && filtradas.length === 0 && (
          <p className="panel-admin__vacio">
            {actividades.length === 0
              ? 'Todavía no hay actividades. Crea la primera con "Nueva actividad".'
              : 'Ninguna actividad coincide con la búsqueda.'}
          </p>
        )}

        {filtradas.length > 0 && (
          <div className="tabla-admin__marco">
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Inicio</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Costo</th>
                  <th scope="col">Cupos</th>
                  <th scope="col">
                    <span className="panel-admin__solo-lector">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((a) => (
                  <tr key={a.id}>
                    <td className="tabla-admin__principal">{a.titulo}</td>
                    <td>{TIPOS[a.tipo]}</td>
                    <td className="tabla-admin__nowrap">{formatoFecha(a.fechaInicio)}</td>
                    <td>
                      <span className={`etiqueta-estado etiqueta-estado--${a.estado}`}>
                        {ESTADOS[a.estado]}
                      </span>
                    </td>
                    <td className="tabla-admin__nowrap">{formatoCosto(a)}</td>
                    <td className="tabla-admin__nowrap">
                      {a.capacidadMaxima === null ? `${a.inscritos} / sin límite` : `${a.inscritos}/${a.capacidadMaxima}`}
                    </td>
                    <td>
                      <Link
                        to={`/admin/actividades/${a.id}`}
                        aria-label={`Editar ${a.titulo}`}
                        className="boton boton--contorno boton--compacto"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
