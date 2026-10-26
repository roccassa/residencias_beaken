import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus } from 'lucide-react'
import { apiDelete, apiPost, apiPut } from '../../api/client'
import { aCampoFecha, desdeCampoFecha } from '../../utils/fechaMexico'
import Field, { inputClass } from '../CampoFormulario'
import NuevaOpcion from './NuevaOpcion'
import { ESTADOS, TIPOS } from './etiquetas'
import './PanelAdmin.css'
import './FormularioActividad.css'

const VACIA = {
  titulo: '',
  tipo: 'curso',
  categoriaId: '',
  instructorId: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  modalidad: 'presencial',
  ubicacionId: '',
  costo: '0',
  capacidadMaxima: '',
  estado: 'borrador',
  imagen: '',
}

// Datos de la actividad -> valores de los campos (todos como texto).
function aCampos(a) {
  if (!a) return VACIA
  return {
    titulo: a.titulo,
    tipo: a.tipo,
    categoriaId: a.categoriaId ?? '',
    instructorId: a.instructorId ?? '',
    descripcion: a.descripcion ?? '',
    fechaInicio: aCampoFecha(a.fechaInicio),
    fechaFin: aCampoFecha(a.fechaFin),
    modalidad: a.modalidad,
    ubicacionId: a.ubicacionId ?? '',
    costo: String(a.costo),
    capacidadMaxima: a.capacidadMaxima === null ? '' : String(a.capacidadMaxima),
    estado: a.estado,
    imagen: a.imagen ?? '',
  }
}

// Valores de los campos -> cuerpo que espera el servidor.
function aCuerpo(d) {
  return {
    titulo: d.titulo,
    tipo: d.tipo,
    categoriaId: d.categoriaId || null,
    instructorId: d.instructorId || null,
    descripcion: d.descripcion,
    fechaInicio: desdeCampoFecha(d.fechaInicio),
    fechaFin: desdeCampoFecha(d.fechaFin),
    modalidad: d.modalidad,
    ubicacionId: d.modalidad === 'presencial' ? d.ubicacionId || null : null,
    costo: d.costo === '' ? null : Number(d.costo),
    capacidadMaxima: d.capacidadMaxima === '' ? null : Number(d.capacidadMaxima),
    estado: d.estado,
    imagen: d.imagen.trim() || null,
  }
}

const categoriaAplica = (categoria, tipo) => !categoria.tipoActividad || categoria.tipoActividad === tipo

// Una lista desplegable con su botón "+ Nueva" que abre el mini formulario de creación.
function CampoCatalogo({ label, id, required, error, valor, onCambio, opciones, vacio, nueva }) {
  const [creando, setCreando] = useState(false)

  return (
    <div>
      <Field label={label} htmlFor={id} required={required} error={error}>
        <div className="formulario-actividad__con-nueva">
          <select id={id} value={valor} onChange={(e) => onCambio(e.target.value)} required={required} className={inputClass}>
            <option value="">{vacio}</option>
            {opciones.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nombre}
              </option>
            ))}
          </select>
          {!creando && (
            <button
              type="button"
              onClick={() => setCreando(true)}
              aria-label={`Crear ${nueva.titulo.toLowerCase()}`}
              className="boton boton--contorno boton--compacto formulario-actividad__boton-nueva"
            >
              <Plus className="panel-admin__boton-icono" aria-hidden="true" />
              Nueva
            </button>
          )}
        </div>
      </Field>

      {creando && (
        <NuevaOpcion
          {...nueva}
          onCerrar={() => setCreando(false)}
          onCreada={(creada) => {
            nueva.onCreada(creada)
            onCambio(creada.id)
            setCreando(false)
          }}
        />
      )}
    </div>
  )
}

export default function FormularioActividad({ actividad, catalogos }) {
  const navigate = useNavigate()
  const editando = Boolean(actividad)
  const [datos, setDatos] = useState(() => aCampos(actividad))
  const [opciones, setOpciones] = useState(catalogos)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const campos = error?.campos ?? {}

  const inscritos = actividad?.inscritos ?? 0
  const categorias = opciones.categorias.filter((c) => categoriaAplica(c, datos.tipo))

  const cambiar = (campo) => (valor) => setDatos((d) => ({ ...d, [campo]: valor }))
  const alEscribir = (campo) => (e) => cambiar(campo)(e.target.value)
  const agregarOpcion = (lista) => (creada) =>
    setOpciones((o) => ({ ...o, [lista]: [...o[lista], creada].sort((a, b) => a.nombre.localeCompare(b.nombre)) }))

  // Al cambiar de tipo, una categoría que solo aplica al tipo anterior deja de valer.
  function cambiarTipo(e) {
    const tipo = e.target.value
    setDatos((d) => {
      const categoria = opciones.categorias.find((c) => c.id === d.categoriaId)
      const sigue = !categoria || categoriaAplica(categoria, tipo)
      return { ...d, tipo, categoriaId: sigue ? d.categoriaId : '' }
    })
  }

  async function guardar(e) {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      if (editando) await apiPut(`/admin/actividades/${actividad.id}`, aCuerpo(datos))
      else await apiPost('/admin/actividades', aCuerpo(datos))
      navigate('/admin/actividades', {
        state: { aviso: `Se guardó "${datos.titulo.trim()}".` },
      })
    } catch (err) {
      setError(err)
      setEnviando(false)
    }
  }

  // Con inscripciones o pagos la actividad no se borra (se perdería el historial): se cancela.
  async function cancelarOEliminar() {
    const cancelar = actividad.tieneHistorial
    const pregunta = cancelar
      ? `¿Cancelar "${actividad.titulo}"?\n\nDejará de verse en el catálogo y ya no aceptará inscripciones. Las inscripciones y pagos se conservan; si alguien pagó, el reembolso se hace desde Mercado Pago.`
      : `¿Eliminar "${actividad.titulo}" definitivamente?\n\nNo tiene inscripciones ni pagos. Esta acción no se puede deshacer.`
    if (!window.confirm(pregunta)) return

    setEnviando(true)
    setError(null)
    try {
      if (cancelar) await apiPost(`/admin/actividades/${actividad.id}/cancelar`, {})
      else await apiDelete(`/admin/actividades/${actividad.id}`)
      navigate('/admin/actividades', {
        state: { aviso: `Se ${cancelar ? 'canceló' : 'eliminó'} "${actividad.titulo}".` },
      })
    } catch (err) {
      setError(err)
      setEnviando(false)
    }
  }

  const yaCancelada = actividad?.estado === 'cancelada'

  return (
    <section>
      <Link to="/admin/actividades" className="panel-admin__volver">
        <ChevronLeft className="panel-admin__volver-icono" aria-hidden="true" />
        Actividades
      </Link>
      <div className="panel-admin__encabezado">
        <h1 className="panel-admin__titulo">{editando ? 'Editar actividad' : 'Nueva actividad'}</h1>
      </div>

      {inscritos > 0 && (
        <p className="panel-admin__aviso panel-admin__aviso--advertencia">
          Esta actividad tiene {inscritos} {inscritos === 1 ? 'persona inscrita' : 'personas inscritas'} (confirmadas
          o con lugar reservado). Si cambias la fecha, el lugar o el costo, avísales. El cupo máximo no puede ser
          menor a {inscritos}.
        </p>
      )}

      <form onSubmit={guardar} className="formulario-actividad">
        <fieldset className="formulario-actividad__grupo">
          <legend className="formulario-actividad__leyenda">Datos generales</legend>
          <div className="formulario-actividad__rejilla">
            <Field label="Título" htmlFor="titulo" required error={campos.titulo}>
              <input id="titulo" value={datos.titulo} onChange={alEscribir('titulo')} required maxLength={200} className={inputClass} />
            </Field>
            <Field label="Tipo" htmlFor="tipo" required error={campos.tipo}>
              <select id="tipo" value={datos.tipo} onChange={cambiarTipo} className={inputClass}>
                {Object.entries(TIPOS).map(([valor, texto]) => (
                  <option key={valor} value={valor}>
                    {texto}
                  </option>
                ))}
              </select>
            </Field>

            <CampoCatalogo
              label="Categoría"
              id="categoria"
              error={campos.categoriaId}
              valor={datos.categoriaId}
              onCambio={cambiar('categoriaId')}
              opciones={categorias}
              vacio="Sin categoría"
              nueva={{
                titulo: `Nueva categoría de ${TIPOS[datos.tipo].toLowerCase()}`,
                ruta: '/admin/categorias',
                campos: [{ name: 'nombre', label: 'Nombre', required: true }],
                extra: { tipoActividad: datos.tipo },
                onCreada: agregarOpcion('categorias'),
              }}
            />
            <CampoCatalogo
              label="Instructor"
              id="instructor"
              error={campos.instructorId}
              valor={datos.instructorId}
              onCambio={cambiar('instructorId')}
              opciones={opciones.instructores}
              vacio="(opcional)"
              nueva={{
                titulo: 'Nuevo instructor',
                ruta: '/admin/instructores',
                campos: [
                  { name: 'nombre', label: 'Nombre', required: true },
                  { name: 'correo', label: 'Correo', hint: 'Opcional' },
                ],
                onCreada: agregarOpcion('instructores'),
              }}
            />

            <div className="formulario-actividad__ancho">
              <Field label="Descripción" htmlFor="descripcion" error={campos.descripcion}>
                <textarea
                  id="descripcion"
                  value={datos.descripcion}
                  onChange={alEscribir('descripcion')}
                  rows={4}
                  placeholder="Lo que verá la gente en el catálogo"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </fieldset>

        <fieldset className="formulario-actividad__grupo">
          <legend className="formulario-actividad__leyenda">Fecha y lugar</legend>
          <div className="formulario-actividad__rejilla">
            <Field label="Inicio" htmlFor="fechaInicio" required error={campos.fechaInicio} hint="Hora de México">
              <input
                id="fechaInicio"
                type="datetime-local"
                value={datos.fechaInicio}
                onChange={alEscribir('fechaInicio')}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Fin" htmlFor="fechaFin" required error={campos.fechaFin} hint="Hora de México">
              <input
                id="fechaFin"
                type="datetime-local"
                value={datos.fechaFin}
                min={datos.fechaInicio || undefined}
                onChange={alEscribir('fechaFin')}
                required
                className={inputClass}
              />
            </Field>

            <Field label="Modalidad" htmlFor="modalidad" required error={campos.modalidad}>
              <select id="modalidad" value={datos.modalidad} onChange={alEscribir('modalidad')} className={inputClass}>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
            </Field>

            {datos.modalidad === 'presencial' ? (
              <CampoCatalogo
                label="Ubicación"
                id="ubicacion"
                required
                error={campos.ubicacionId}
                valor={datos.ubicacionId}
                onCambio={cambiar('ubicacionId')}
                opciones={opciones.ubicaciones}
                vacio="Elige una sede"
                nueva={{
                  titulo: 'Nueva ubicación',
                  ruta: '/admin/ubicaciones',
                  campos: [
                    { name: 'nombre', label: 'Nombre de la sede', required: true },
                    { name: 'direccion', label: 'Dirección' },
                    { name: 'ciudad', label: 'Ciudad' },
                    { name: 'mapaUrl', label: 'Enlace al mapa', hint: 'Opcional, por ejemplo de Google Maps' },
                  ],
                  onCreada: agregarOpcion('ubicaciones'),
                }}
              />
            ) : (
              <p className="formulario-actividad__nota">Las actividades virtuales no llevan ubicación.</p>
            )}
          </div>
        </fieldset>

        <fieldset className="formulario-actividad__grupo">
          <legend className="formulario-actividad__leyenda">Precio, cupo y publicación</legend>
          <div className="formulario-actividad__rejilla">
            <Field label="Costo (MXN, 0 = gratis)" htmlFor="costo" required error={campos.costo}>
              <input
                id="costo"
                type="number"
                min="0"
                step="0.01"
                value={datos.costo}
                onChange={alEscribir('costo')}
                required
                className={inputClass}
              />
            </Field>
            <Field
              label="Cupo máximo"
              htmlFor="capacidadMaxima"
              error={campos.capacidadMaxima}
              hint={inscritos > 0 ? `Vacío = sin límite. Mínimo ${inscritos} (inscritos actuales).` : 'Vacío = sin límite.'}
            >
              <input
                id="capacidadMaxima"
                type="number"
                min={Math.max(inscritos, 1)}
                step="1"
                value={datos.capacidadMaxima}
                onChange={alEscribir('capacidadMaxima')}
                className={inputClass}
              />
            </Field>

            <Field
              label="Estado"
              htmlFor="estado"
              required
              error={campos.estado}
              hint="Solo las publicadas aparecen en el sitio."
            >
              <select id="estado" value={datos.estado} onChange={alEscribir('estado')} className={inputClass}>
                {Object.entries(ESTADOS).map(([valor, texto]) => (
                  <option key={valor} value={valor}>
                    {texto}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Imagen (dirección)"
              htmlFor="imagen"
              error={campos.imagen}
              hint="https://… o una ruta del sitio como /img/talleres/taller1.webp"
            >
              <input
                id="imagen"
                value={datos.imagen}
                onChange={alEscribir('imagen')}
                placeholder="https://…"
                className={inputClass}
              />
            </Field>
            {datos.imagen.trim() && (
              <div className="formulario-actividad__ancho">
                <img src={datos.imagen.trim()} alt="Vista previa de la imagen" className="formulario-actividad__vista-previa" />
              </div>
            )}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="panel-admin__aviso panel-admin__aviso--error">
            {error.message}
          </p>
        )}

        <div className="formulario-actividad__acciones">
          {editando && (
            <div className="formulario-actividad__peligro">
              {!(actividad.tieneHistorial && yaCancelada) && (
                <button
                  type="button"
                  onClick={cancelarOEliminar}
                  disabled={enviando}
                  className="formulario-actividad__boton-peligro"
                >
                  {actividad.tieneHistorial ? 'Cancelar actividad' : 'Eliminar actividad'}
                </button>
              )}
              <p className="formulario-actividad__nota">
                {actividad.tieneHistorial
                  ? yaCancelada
                    ? 'Está cancelada. No se puede eliminar porque tiene inscripciones o pagos.'
                    : 'Tiene inscripciones o pagos: no se puede eliminar, solo cancelar.'
                  : 'No tiene inscripciones ni pagos: se puede eliminar.'}
              </p>
            </div>
          )}

          <div className="formulario-actividad__guardar">
            <Link to="/admin/actividades" className="boton boton--contorno">
              Descartar
            </Link>
            <button type="submit" disabled={enviando} className="boton">
              {enviando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Crear actividad'}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
