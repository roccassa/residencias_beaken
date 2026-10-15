import agenda from '../../assets/images/agenda.jpg'
import '../Ventajas.css'
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
    <section className="ventajas-evento">
      <div className="ventajas-evento__rejilla">
        <div className="ventajas-evento__imagen">
          <img
              src={agenda}  
              alt=""
              className="ventajas-evento__foto"
            />
        </div>

        <div>
          <div className="ventajas-evento__lista">
            {ventajas.map(({ icon: Icon, titulo, descripcion }) => (
              <div key={titulo}>
                <Icon />
                <h3 className="ventajas-evento__titulo">
                  {titulo}
                </h3>
                <p className="ventajas-evento__texto">{descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
