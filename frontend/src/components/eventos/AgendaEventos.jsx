import { useMemo, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import '../Agenda.css'
import EventoRow from './EventoRow'

export default function AgendaEventos() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const { data: eventos, cargando, error } = useFetch('/actividades?tipo=evento')
  const { data: categorias } = useFetch('/categorias?tipo=evento')

  const eventosFiltrados = useMemo(() => {
    if (!eventos) return []
    if (!categoriaActiva) return eventos
    return eventos.filter((evento) => evento.categoriaId === categoriaActiva)
  }, [eventos, categoriaActiva])

  return (
    <section className="agenda">
      <SectionHeading
        label="Eventos"
        title="Próximos eventos"
        description="Conecta con otras personas, comparte ideas y aprende en comunidad. Filtra por categoría y aparta tu lugar."
      />

      <div className="agenda__filtros">
        <button
          type="button"
          onClick={() => setCategoriaActiva(null)}
          className={`boton boton--contorno boton--compacto${categoriaActiva === null ? ' boton--activo' : ''}`}
        >
          Ver Todo
        </button>
        {(categorias ?? []).map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`agenda__categoria${categoriaActiva === categoria.id ? ' agenda__categoria--activa' : ''}`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className="agenda__filas">
        <EstadoCarga cargando={cargando} error={error} />

        {eventosFiltrados.map((evento) => (
          <EventoRow key={evento.id} evento={evento} />
        ))}

        {!cargando && !error && eventosFiltrados.length === 0 && (
          <p className="agenda__vacio-fila">
            No hay eventos disponibles en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  )
}
