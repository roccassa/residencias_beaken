import agenda from '../../assets/images/agenda.jpg'

const iconProps = {
  className: 'tw:size-6',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function IconLaptop() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </svg>
  )
}

function IconTag() {
  return (
    <svg {...iconProps}>
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

function IconDocument() {
  return (
    <svg {...iconProps}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg {...iconProps}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14a5 5 0 0 1 4.5 5" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg {...iconProps}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
    </svg>
  )
}

const ventajas = [
  {
    icon: IconLaptop,
    titulo: 'Modalidad flexible',
    descripcion: 'Presencial u online. Tú decides cómo y desde dónde aprender.',
  },
  {
    icon: IconTag,
    titulo: 'Precios accesibles',
    descripcion:
      'Aprender no debe costar una fortuna. Encuentra opciones para tu bolsillo.',
  },
  {
    icon: IconUser,
    titulo: 'Instructores especializados',
    descripcion: 'Gente que vive lo que enseña. Aprende directo de la fuente.',
  },
  {
    icon: IconDocument,
    titulo: 'Certificación',
    descripcion:
      'Termina el evento y llévate un documento que respalde lo aprendido.',
  },
  {
    icon: IconUsers,
    titulo: 'Networking real',
    descripcion:
      'Conoce a otras personas de tu industria y amplía tu red de contactos.',
  },
  {
    icon: IconChat,
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

          <div className="tw:mt-10 tw:flex tw:items-center tw:gap-6 tw:text-sm tw:font-medium">
            <a
              href="#"
              className="tw:rounded-md tw:border tw:border-neutral-300 tw:bg-white tw:px-4 tw:py-2 tw:hover:bg-neutral-50"
            >
              Explorar
            </a>
            <a
              href="#"
              className="tw:flex tw:items-center tw:gap-1 tw:text-neutral-900 tw:hover:text-neutral-500"
            >
              Más
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
