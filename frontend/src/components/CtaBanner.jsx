import tuLugarImg from '../assets/images/tu_lugar_espera.jpg'

export default function CtaBanner({
  description = 'Explora el catálogo completo o escríbenos por WhatsApp para una asesoría personalizada sin compromiso.',
  primaryLabel = 'Registrarme ahora',
}) {
  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-10">
      <div className="tw:grid tw:overflow-hidden tw:border tw:border-neutral-200 tw:sm:grid-cols-2">
        <div className="tw:flex tw:flex-col tw:justify-center tw:gap-6 tw:p-10">
          <h2 className="tw:text-2xl tw:font-medium tw:tracking-tight tw:text-neutral-900 tw:md:text-3xl">
            Tu lugar te espera
          </h2>
          <p className="tw:text-neutral-600">{description}</p>
          <div className="tw:flex tw:flex-wrap tw:gap-3">
            <a
              href="/registro"
              className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
            >
              {primaryLabel}
            </a>
            <a
              href="#cursos"
              className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50"
            >
              Explorar
            </a>
          </div>
          </div>
            <img
              src={tuLugarImg}  
              alt=""
              className="tw:size-full tw:min-h-48 tw:object-cover"
            />
          </div>
    </section>
  )
}
