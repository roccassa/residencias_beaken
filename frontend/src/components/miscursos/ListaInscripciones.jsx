import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import TarjetaInscripcion from './TarjetaInscripcion'

export default function ListaInscripciones() {
  const { data: inscripciones, cargando, error } = useFetch('/mis-inscripciones')

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading
            label="Registro"
            title="Tus cursos"
            description="Cursos, talleres y eventos en los que estás inscrito."
          />
        </div>

        <div>
          <EstadoCarga cargando={cargando} error={error} />

          {inscripciones?.length === 0 && (
            <div className="tw:border tw:border-dashed tw:border-neutral-300 tw:p-8 tw:text-center">
              <p className="tw:text-neutral-600">Aún no estás inscrito en ninguna actividad.</p>
              <Link
                to="/cursos"
                className="tw:mt-5 tw:inline-block tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
              >
                Explorar cursos
              </Link>
            </div>
          )}

          <div className="tw:space-y-12">
            {inscripciones?.map((inscripcion) => (
              <TarjetaInscripcion key={inscripcion.id} inscripcion={inscripcion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
