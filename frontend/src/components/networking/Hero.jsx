import { Link } from 'react-router-dom'
import heroImg from '../../assets/images/heroInscripcion.jpg'
import miniImg from '../../assets/images/heroInscripcion2.jpg'

export default function Hero() {
  return (
    <section>
      <div className="tw:relative">
        <img
          src={heroImg}
          alt=""
          className="tw:h-72 tw:w-full tw:object-cover tw:sm:h-96 tw:md:h-[28rem]"
        />
        <div className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:hidden tw:sm:block">
          <div className="tw:mx-auto tw:flex tw:max-w-6xl tw:justify-end tw:px-6">
            <img
              src={miniImg}
              alt=""
              className="tw:size-44 tw:translate-y-1/4 tw:border-4 tw:border-white tw:object-cover tw:md:size-56"
            />
          </div>
        </div>
      </div>

      <div className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-6 tw:px-6 tw:pb-4 tw:pt-12 tw:sm:pt-16 tw:md:grid-cols-2 tw:md:items-end tw:md:gap-12 tw:md:pt-20">
        <h1 className="tw:font-display tw:text-5xl tw:font-semibold tw:leading-tight tw:tracking-tight tw:text-fondo-oscuro-secciones tw:md:text-6xl">
          Aprende algo nuevo hoy
        </h1>
        <div>
          <p className="tw:max-w-md tw:text-lg tw:text-neutral-600">
            Cursos, talleres y eventos presenciales y en línea. Encuentra el que encaje contigo
            y regístrate.
          </p>
          <div className="tw:mt-6 tw:flex tw:flex-wrap tw:gap-3">
            <a
              href="#cursos"
              className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
            >
              Explorar actividades
            </a>
            <Link
              to="/registro"
              className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50"
            >
              Inscribirme
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
