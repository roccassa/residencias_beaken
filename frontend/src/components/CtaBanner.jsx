export default function CtaBanner() {
  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-10">
      <div className="tw:grid tw:overflow-hidden tw:border tw:border-neutral-200 tw:sm:grid-cols-2">
        <div className="tw:flex tw:flex-col tw:justify-center tw:gap-6 tw:p-10">
          <h2 className="tw:text-2xl tw:font-medium tw:tracking-tight tw:text-neutral-900 tw:md:text-3xl">
            Tu lugar te espera
          </h2>
          <p className="tw:text-neutral-600">
            Explora el catálogo completo o escríbenos por WhatsApp para una
            asesoría personalizada sin compromiso.
          </p>
          <div className="tw:flex tw:flex-wrap tw:gap-3">
            <a
              href="/registro"
              className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
            >
              Registrarme ahora
            </a>
            <a
              href="#cursos"
              className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50"
            >
              Explorar
            </a>
          </div>
        </div>
        <div className="tw:flex tw:min-h-48 tw:items-center tw:justify-center tw:bg-neutral-200">
          <svg className="tw:size-12 tw:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
      </div>
    </section>
  )
}
