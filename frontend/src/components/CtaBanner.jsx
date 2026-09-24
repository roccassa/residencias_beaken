import tuLugarImg from '../assets/images/tu_lugar_espera.jpg'

export default function CtaBanner({
  description = 'Explora el catálogo completo o escríbenos por WhatsApp para una asesoría personalizada sin compromiso.',
  primaryLabel = 'Registrarme ahora',
}) {
  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-10">
      <div className="tw:grid tw:overflow-hidden tw:border tw:border-neutral-200 tw:sm:grid-cols-2">
        <div className="tw:flex tw:flex-col tw:justify-center tw:gap-6 tw:p-10">
          <div>
            <div className="tw:inline-flex tw:items-center tw:gap-2">
              <span className="tw:size-1.5 tw:shrink-0 tw:rounded-full tw:bg-rose-500" />
              <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-widest tw:text-slate-500">
                Únete
              </p>
            </div>
            <h2 className="tw:mt-3 tw:font-display tw:text-3xl tw:font-semibold tw:leading-tight tw:tracking-tight tw:text-fondo-oscuro-secciones tw:md:text-[52px]">
              Tu lugar te espera
            </h2>
          </div>
          <p className="tw:text-neutral-600">{description}</p>
          <div className="tw:flex tw:flex-wrap tw:gap-3">
            <a
              href="/registro"
              className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
            >
              {primaryLabel}
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
