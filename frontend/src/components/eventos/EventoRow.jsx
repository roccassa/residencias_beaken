import { Link } from 'react-router-dom'
import './EventoRow.css'

const dayName = new Intl.DateTimeFormat('es', { weekday: 'short' })
const monthYear = new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' })

const botonClass = 'boton boton--contorno boton--compacto fila-evento__boton'

export default function EventoRow({ evento }) {
  const fecha = new Date(evento.fechaInicio)
  const agotado = evento.agotada

  return (
    <article className="fila-evento" data-aparece>
      <div className="fila-evento__principal">
        <div className="fila-evento__fecha">
          <p className="fila-evento__dia-semana">{dayName.format(fecha)}</p>
          <p className="fila-evento__dia">{fecha.getDate().toString().padStart(2, '0')}</p>
          <p className="fila-evento__mes">{monthYear.format(fecha)}</p>
        </div>

        <div>
          <div className="fila-evento__encabezado">
            <h3 className="fila-evento__titulo">{evento.titulo}</h3>
            {agotado && <span className="fila-evento__agotado">Sold out</span>}
          </div>
          <p className="fila-evento__lugar">
            {evento.modalidad === 'presencial' ? evento.ubicacion : 'Virtual'}
          </p>
          <p className="fila-evento__descripcion">{evento.descripcion}</p>
        </div>
      </div>

      {agotado ? (
        <button type="button" disabled className={`${botonClass} boton--agotado`}>
          Agotado
        </button>
      ) : (
        <Link to={`/registro?actividad=${evento.id}`} className={botonClass}>
          Inscribirme
        </Link>
      )}
    </article>
  )
}
