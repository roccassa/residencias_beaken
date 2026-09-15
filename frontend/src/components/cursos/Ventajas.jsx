import SectionHeading from '../SectionHeading'

function IconInfinity() {
  return (
    <svg className="tw:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 15a3 3 0 1 1 0-6c2.5 0 4.5 3 6 3s3.5-3 6-3a3 3 0 1 1 0 6c-2.5 0-4.5-3-6-3s-3.5 3-6 3Z" />
    </svg>
  )
}

function IconRefresh() {
  return (
    <svg className="tw:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.3 6.4L3 16m0 5v-5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Ventajas() {
  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:border-t tw:border-neutral-200 tw:pt-10">
        <SectionHeading
          align="center"
          label="Ventajas"
          title="Aprende sin fricción"
          description="Todo lo que necesitas para aprovechar cada curso y taller."
        />
      </div>

      <div className="tw:mt-12 tw:grid tw:gap-px tw:overflow-hidden tw:border tw:border-neutral-200 tw:bg-neutral-200 tw:md:grid-cols-3">
        <div className="tw:flex tw:flex-col tw:justify-between tw:bg-white tw:p-8">
          <div>
            <p className="tw:text-sm tw:font-semibold tw:text-neutral-500">Incluido</p>
            <h3 className="tw:mt-2 tw:text-xl tw:font-semibold tw:text-neutral-900">
              Certificación al terminar cada curso
            </h3>
            <p className="tw:mt-3 tw:text-sm tw:text-neutral-600">
              Recibe un certificado digital que valida tu aprendizaje y suma
              a tu perfil profesional.
            </p>
          </div>
          <div className="tw:mt-6 tw:flex tw:items-center tw:gap-6 tw:text-sm tw:font-medium">
            <a href="#" className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-4 tw:py-2 tw:hover:bg-neutral-50">
              Explorar
            </a>
            <a href="#" className="tw:flex tw:items-center tw:gap-1 tw:text-neutral-900 tw:hover:text-neutral-500">
              Más
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        <div className="tw:flex tw:flex-col tw:justify-between tw:bg-white tw:p-8">
          <div>
            <IconInfinity />
            <h3 className="tw:mt-4 tw:text-xl tw:font-semibold tw:text-neutral-900">
              Materiales incluidos en el precio
            </h3>
            <p className="tw:mt-3 tw:text-sm tw:text-neutral-600">
              No pagues extra. Todo lo necesario está cubierto.
            </p>
          </div>
          <a href="#" className="tw:mt-6 tw:flex tw:items-center tw:gap-1 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500">
            Más
            <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="tw:flex tw:flex-col tw:justify-between tw:bg-white tw:p-8">
          <div>
            <IconRefresh />
            <h3 className="tw:mt-4 tw:text-xl tw:font-semibold tw:text-neutral-900">
              Acceso a grabaciones de sesiones
            </h3>
            <p className="tw:mt-3 tw:text-sm tw:text-neutral-600">
              Repasa cuando quieras. Las clases quedan guardadas.
            </p>
          </div>
          <a href="#" className="tw:mt-6 tw:flex tw:items-center tw:gap-1 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500">
            Más
            <span aria-hidden="true">›</span>
          </a>
        </div>


      </div>
    </section>
  )
}
