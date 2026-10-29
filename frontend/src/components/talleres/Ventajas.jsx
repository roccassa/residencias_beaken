import SectionHeading from '../SectionHeading'
import '../Ventajas.css'
import { Infinity as InfinityIcon, RefreshCw, Headset } from 'lucide-react'

const ventajas = [
  {
    icon: InfinityIcon,
    titulo: 'Materiales incluidos en el precio',
    descripcion: 'No pagues extra. Todo lo necesario está cubierto.',
  },
  {
    icon: RefreshCw,
    titulo: 'Acceso a grabaciones de sesiones',
    descripcion: 'Repasa cuando quieras. Las clases quedan guardadas.',
  },
  {
    icon: Headset,
    titulo: 'Soporte directo con instructores',
    descripcion: 'Resuelve dudas rápido. Habla directo con quien enseña.',
  },
]

export default function Ventajas() {
  return (
    <section className="ventajas">
      <div className="ventajas__encabezado">
        <SectionHeading
          variant="dot"
          align="center"
          label="Ventajas"
          title="Aprende sin fricción"
          description="Todo lo que necesitas para aprovechar cada curso y taller."
        />
      </div>

      <div className="ventajas__rejilla">
        {ventajas.map(({ icon: Icon, titulo, descripcion }) => (
          <div key={titulo} className="ventajas__item">
            <div data-aparece>
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
