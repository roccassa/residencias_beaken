import { useRef, useState } from 'react'
import { talleres } from '../../data/talleres'
import SectionHeading from '../SectionHeading'
import TallerCard from './TallerCard'

export default function AgendaTalleres() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

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
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:flex tw:flex-col tw:justify-between tw:gap-4 tw:sm:flex-row tw:sm:items-end">
        <SectionHeading
          label="Talleres"
          title="Formación para todos"
          description="Elige entre presencial u online. Aparta tu lugar hoy."
        />
        <a
          href="#"
          className="tw:inline-flex tw:w-fit tw:h-fit tw:shrink-0 tw:items-center tw:rounded-md tw:bg-neutral-900 tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
        >
          Inscribirme
        </a>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="tw:mt-8 tw:flex tw:snap-x tw:gap-4 tw:overflow-x-auto tw:scroll-smooth tw:pb-2"
      >
        {talleres.map((taller) => (
          <TallerCard key={taller.id} taller={taller} />
        ))}
      </div>

      <div className="tw:mt-6 tw:flex tw:items-center tw:justify-between">
        <div className="tw:flex tw:gap-1.5">
          {talleres.map((taller, i) => (
            <span
              key={taller.id}
              className={`tw:size-1.5 tw:rounded-full ${
                i === active ? 'tw:bg-neutral-900' : 'tw:bg-neutral-300'
              }`}
            />
          ))}
        </div>

        <div className="tw:flex tw:gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="tw:flex tw:size-9 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-neutral-300 tw:text-neutral-600 tw:hover:bg-neutral-50"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Siguiente"
            className="tw:flex tw:size-9 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-neutral-300 tw:text-neutral-600 tw:hover:bg-neutral-50"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
