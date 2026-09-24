import SectionHeading from '../SectionHeading'
import { Tag, User, RefreshCw } from 'lucide-react'

const ventajas = [
  {
    icon: Tag,
    titulo: 'Precios accesibles',
    descripcion:
      'Aprender no debe costar una fortuna. Encuentra opciones para tu bolsillo.',
  },
  {
    icon: User,
    titulo: 'Instructores especializados',
    descripcion: 'Gente que vive lo que enseña. Aprende directo de la fuente.',
  },
  {
    icon: RefreshCw,
    titulo: 'Acceso a grabaciones de sesiones',
    descripcion: 'Repasa cuando quieras. Las clases quedan guardadas.',
  },
]

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
