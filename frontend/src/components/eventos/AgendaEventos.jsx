import { useMemo, useState } from 'react'
import { categoriasEventos, eventos } from '../../data/eventos'
import SectionHeading from '../SectionHeading'
import EventoRow from './EventoRow'

export default function AgendaEventos() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)

  const eventosFiltrados = useMemo(() => {
    if (!categoriaActiva) return eventos
    return eventos.filter((evento) => evento.categoriaId === categoriaActiva)
  }, [categoriaActiva])

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Eventos"
        title="Próximos eventos"
        description="Conecta con otras personas, comparte ideas y aprende en comunidad. Filtra por categoría y aparta tu lugar."
      />

      <div className="tw:mt-8 tw:flex tw:flex-wrap tw:items-center tw:gap-3">
        <button
          type="button"
          onClick={() => setCategoriaActiva(null)}
          className={`tw:rounded-md tw:border tw:px-4 tw:py-2 tw:text-sm tw:font-medium ${
            categoriaActiva === null
              ? 'tw:border-neutral-900 tw:bg-neutral-900 tw:text-white'
              : 'tw:border-neutral-300 tw:text-neutral-900 tw:hover:bg-neutral-50'
          }`}
        >
          Ver Todo
        </button>
        {categoriasEventos.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`tw:px-2 tw:py-2 tw:text-sm tw:font-medium ${
              categoriaActiva === categoria.id
                ? 'tw:text-neutral-900 tw:underline tw:underline-offset-4'
                : 'tw:text-neutral-500 tw:hover:text-neutral-900'
            }`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className="tw:mt-8 tw:border-t tw:border-neutral-300">
        {eventosFiltrados.map((evento) => (
          <EventoRow key={evento.id} evento={evento} />
        ))}

        {eventosFiltrados.length === 0 && (
          <p className="tw:border-b tw:border-neutral-300 tw:py-8 tw:text-center tw:text-neutral-500">
            No hay eventos disponibles en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  )
}
