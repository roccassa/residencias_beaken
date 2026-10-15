import SectionHeading from '../SectionHeading'
import '../Ventajas.css'
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
    <section className="ventajas">
      <div className="ventajas__encabezado">
        <SectionHeading
          align="center"
          label="Ventajas"
          title="Aprende sin fricción"
          description="Todo lo que necesitas para aprovechar cada curso y taller."
        />
      </div>

      <div className="ventajas__rejilla">
        {ventajas.map(({ icon: Icon, titulo, descripcion }) => (
          <div key={titulo} className="ventajas__item">
            <div>
              <Icon />
              <h3 className="ventajas__titulo">
                {titulo}
              </h3>
              <p className="ventajas__texto">{descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
