import agenda from '../../assets/images/agenda.jpg'
import { Laptop, Tag, User, FileText, Users, MessageCircle } from 'lucide-react'

const ventajas = [
  {
    icon: Laptop,
    titulo: 'Modalidad flexible',
    descripcion: 'Presencial u online. Tú decides cómo y desde dónde aprender.',
  },
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
    icon: Users,
    titulo: 'Networking real',
    descripcion:
      'Conoce a otras personas de tu industria y amplía tu red de contactos.',
  },
  {
    icon: MessageCircle,
    titulo: 'Comunidad activa',
    descripcion:
      'Mantente conectado con asistentes y ponentes después del evento.',
  },
]

export default function Ventajas() {
  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:grid tw:items-center tw:gap-12 tw:md:grid-cols-2">
        <div className="tw:flex tw:aspect-square tw:items-center tw:justify-center tw:bg-neutral-200">
          <img
              src={agenda}  
              alt=""
              className="tw:size-full tw:min-h-48 tw:object-cover"
            />
        </div>

        <div>
          <div className="tw:grid tw:gap-x-8 tw:gap-y-10 tw:sm:grid-cols-2">
            {ventajas.map(({ icon: Icon, titulo, descripcion }) => (
              <div key={titulo}>
                <Icon />
                <h3 className="tw:mt-4 tw:text-lg tw:font-semibold tw:text-neutral-900">
                  {titulo}
                </h3>
                <p className="tw:mt-2 tw:text-sm tw:text-neutral-600">{descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
