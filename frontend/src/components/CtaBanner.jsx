export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid overflow-hidden border border-neutral-200 sm:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-10">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900 md:text-3xl">
            Tu lugar te espera
          </h2>
          <p className="text-neutral-600">
            Explora el catálogo completo o escríbenos por WhatsApp para una
            asesoría personalizada sin compromiso.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/registro"
              className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
            >
              Registrarme ahora
            </a>
            <a
              href="#cursos"
              className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
            >
              Explorar
            </a>
          </div>
        </div>
        <div className="flex min-h-48 items-center justify-center bg-neutral-200">
          <svg className="size-12 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
      </div>
    </section>
  )
}
