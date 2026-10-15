import { Link } from 'react-router-dom'
import './TallerCard.css'

const dayNumber = new Intl.DateTimeFormat('es', { day: '2-digit' })
const month = new Intl.DateTimeFormat('es', { month: 'short' })

// `className` permite añadir variantes (por ejemplo "tarjeta-taller--flexible").
export default function TallerCard({ taller, className = '' }) {
  const fecha = new Date(taller.fechaInicio)

  return (
    <article className={`tarjeta-taller ${className}`.trim()}>
      <div className="tarjeta-taller__imagen">
        {taller.imagen && (
          <img src={taller.imagen} alt={taller.titulo} className="tarjeta-taller__foto" />
        )}
        <div className="tarjeta-taller__fecha">
          <p className="tarjeta-taller__duracion">{taller.duracion}</p>
          <p className="tarjeta-taller__dia">{dayNumber.format(fecha)}</p>
          <p className="tarjeta-taller__mes">{month.format(fecha)}</p>
        </div>
      </div>

      <span className="tarjeta-taller__modalidad">
        {taller.modalidad === 'presencial' ? 'Presencial' : 'Online'}
      </span>

      <h3 className="tarjeta-taller__titulo">{taller.titulo}</h3>
      <p className="tarjeta-taller__descripcion">{taller.descripcion}</p>

      <Link to={`/registro?actividad=${taller.id}`} className="tarjeta-taller__enlace">
        Inscribirme
        <span aria-hidden="true">›</span>
      </Link>
    </article>
  )
}
