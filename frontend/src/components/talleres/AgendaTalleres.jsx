import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import TallerCard from './TallerCard'
import './AgendaTalleres.css'

export default function AgendaTalleres() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const { data, cargando, error } = useFetch('/actividades?tipo=taller')
  const talleres = data ?? []

  function scrollByCard(direction) {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    const cardWidth = card ? card.getBoundingClientRect().width + 16 : 300
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    const cardWidth = card ? card.getBoundingClientRect().width + 16 : 300
    const index = Math.round(track.scrollLeft / cardWidth)
    setActive(Math.min(index, talleres.length - 1))
  }

  return (
    <section className="agenda-talleres">
      <div className="agenda-talleres__cabecera">
        <SectionHeading
          variant="dot"
          label="Talleres"
          title="Formación para todos"
          description="Elige entre presencial u online. Aparta tu lugar hoy."
        />
        <Link
          to="/registro"
          className="boton boton--compacto boton--cabecera"
        >
          Inscribirme
        </Link>
      </div>

      {(cargando || error) && (
        <div className="agenda-talleres__estado">
          <EstadoCarga cargando={cargando} error={error} />
        </div>
      )}

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="agenda-talleres__carrusel"
        data-aparece={talleres.length > 0 || undefined}
      >
        {talleres.map((taller) => (
          <TallerCard key={taller.id} taller={taller} aparece={false} />
        ))}
      </div>

      <div className="agenda-talleres__pie">
        <div className="agenda-talleres__puntos">
          {talleres.map((taller, i) => (
            <span
              key={taller.id}
              className={`agenda-talleres__punto${i === active ? ' agenda-talleres__punto--activo' : ''}`}
            />
          ))}
        </div>

        <div className="agenda-talleres__flechas">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="agenda-talleres__flecha"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Siguiente"
            className="agenda-talleres__flecha"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
