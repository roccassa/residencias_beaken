import { Link } from 'react-router-dom'
import './CourseCard.css'

const dayName = new Intl.DateTimeFormat('es', { weekday: 'short' })
const monthYear = new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' })

const botonClass = 'boton boton--contorno boton--compacto tarjeta-curso__boton'

export default function CourseCard({ curso }) {
  const fecha = new Date(curso.fechaInicio)
  const agotado = curso.agotada

  return (
    <article className="tarjeta-curso">
      <div className="tarjeta-curso__principal">
        <div className="tarjeta-curso__fecha">
          <p className="tarjeta-curso__dia-semana">{dayName.format(fecha)}</p>
          <p className="tarjeta-curso__dia">{fecha.getDate().toString().padStart(2, '0')}</p>
          <p className="tarjeta-curso__mes">{monthYear.format(fecha)}</p>
        </div>

        <div>
          <div className="tarjeta-curso__encabezado">
            <h3 className="tarjeta-curso__titulo">{curso.titulo}</h3>
            {agotado && <span className="tarjeta-curso__agotado">Sold out</span>}
          </div>
          <p className="tarjeta-curso__lugar">
            {curso.modalidad === 'presencial' ? curso.ubicacion : 'Virtual'}
          </p>
          <p className="tarjeta-curso__descripcion">{curso.descripcion}</p>
        </div>
      </div>

      {agotado ? (
        <button type="button" disabled className={`${botonClass} boton--agotado`}>
          Agotado
        </button>
      ) : (
        <Link to={`/registro?actividad=${curso.id}`} className={botonClass}>
          Inscribirme
        </Link>
      )}
    </article>
  )
}
