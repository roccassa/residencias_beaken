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

function IconHeadset() {
  return (
    <svg className="tw:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 13v-1a8 8 0 1 1 16 0v1" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a3 3 0 0 1-3 3h-3" strokeLinecap="round" />
    </svg>
  )
}

const ventajas = [
  {
    icon: IconInfinity,
    titulo: 'Materiales incluidos en el precio',
    descripcion: 'No pagues extra. Todo lo necesario está cubierto.',
  },
  {
    icon: IconRefresh,
    titulo: 'Acceso a grabaciones de sesiones',
    descripcion: 'Repasa cuando quieras. Las clases quedan guardadas.',
  },
  {
    icon: IconHeadset,
    titulo: 'Soporte directo con instructores',
    descripcion: 'Resuelve dudas rápido. Habla directo con quien enseña.',
  },
]

export default function Ventajas() {
  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:border-t tw:border-neutral-200 tw:pt-10">
        <SectionHeading
          variant="dot"
          align="center"
          label="Ventajas"
          title="Aprende sin fricción"
          description="Todo lo que necesitas para aprovechar cada curso y taller."
        />
      </div>

      <div className="tw:mt-12 tw:grid tw:gap-px tw:overflow-hidden tw:border tw:border-neutral-200 tw:bg-neutral-200 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
        {ventajas.map(({ icon: Icon, titulo, descripcion }) => (
          <div key={titulo} className="tw:flex tw:flex-col tw:justify-between tw:bg-white tw:p-8">
            <div>
              <Icon />
              <h3 className="tw:mt-4 tw:text-xl tw:font-semibold tw:text-neutral-900">
                {titulo}
              </h3>
              <p className="tw:mt-3 tw:text-sm tw:text-neutral-600">{descripcion}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
