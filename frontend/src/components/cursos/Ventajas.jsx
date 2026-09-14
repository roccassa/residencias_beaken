function IconInfinity() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 15a3 3 0 1 1 0-6c2.5 0 4.5 3 6 3s3.5-3 6-3a3 3 0 1 1 0 6c-2.5 0-4.5-3-6-3s-3.5 3-6 3Z" />
    </svg>
  )
}

function IconRefresh() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.3 6.4L3 16m0 5v-5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Ventajas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="border-t border-neutral-200 pt-10 text-center">
        <p className="text-sm font-semibold text-neutral-500">Ventajas</p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
          Aprende sin fricción
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Todo lo que necesitas para aprovechar cada curso y taller.
        </p>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
        <div className="flex flex-col justify-between bg-white p-8">
          <div>
            <p className="text-sm font-semibold text-neutral-500">Incluido</p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-900">
              Certificación al terminar cada curso
            </h3>
            <p className="mt-3 text-sm text-neutral-600">
              Recibe un certificado digital que valida tu aprendizaje y suma
              a tu perfil profesional.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm font-medium">
            <a href="#" className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
              Explorar
            </a>
            <a href="#" className="flex items-center gap-1 text-neutral-900 hover:text-neutral-500">
              Más
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-white p-8">
          <div>
            <IconInfinity />
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
              Materiales incluidos en el precio
            </h3>
            <p className="mt-3 text-sm text-neutral-600">
              No pagues extra. Todo lo necesario está cubierto.
            </p>
          </div>
          <a href="#" className="mt-6 flex items-center gap-1 text-sm font-medium text-neutral-900 hover:text-neutral-500">
            Más
            <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="flex flex-col justify-between bg-white p-8">
          <div>
            <IconRefresh />
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
              Acceso a grabaciones de sesiones
            </h3>
            <p className="mt-3 text-sm text-neutral-600">
              Repasa cuando quieras. Las clases quedan guardadas.
            </p>
          </div>
          <a href="#" className="mt-6 flex items-center gap-1 text-sm font-medium text-neutral-900 hover:text-neutral-500">
            Más
            <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="flex flex-col bg-white sm:flex-row md:col-span-3">
          <div className="flex aspect-video shrink-0 items-center justify-center bg-neutral-200 sm:aspect-auto sm:w-64">
            <svg className="size-10 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8">
            <h3 className="text-xl font-semibold text-neutral-900">
              Contacto directo con instructores
            </h3>
            <p className="mt-3 text-sm text-neutral-600">
              Resuelve dudas rápido. Habla directo con el instructor cuando
              lo necesites.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
