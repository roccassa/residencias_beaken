import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import './ActividadesProximas.css'

const MAXIMO = 3

// Las próximas actividades de un tipo (el servidor ya las entrega por fecha de inicio
// y sin las que terminaron) y un botón que lleva al catálogo completo de ese tipo.
// `diseno`: "lista" apila las tarjetas; "carrusel" las pone en fila (con desplazamiento
// horizontal en pantallas pequeñas).
export default function ActividadesProximas({
  id,
  tipo,
  label,
  title,
  description,
  textoVerTodos,
  destino,
  Tarjeta,
  propTarjeta,
  claseTarjeta,
  vacio,
  diseno = 'lista',
}) {
  const { data, cargando, error } = useFetch(`/actividades?tipo=${tipo}`)
  const proximas = (data ?? []).slice(0, MAXIMO)

  return (
    <section id={id} className="actividades-proximas">
      <div className="actividades-proximas__cabecera">
        <SectionHeading label={label} title={title} description={description} />
        <Link
          to={destino}
          className="boton boton--compacto boton--cabecera"
        >
          {textoVerTodos}
        </Link>
      </div>

      <div className="actividades-proximas__contenido">
        <EstadoCarga cargando={cargando} error={error} />

        {!cargando && !error && proximas.length === 0 && (
          <p className="actividades-proximas__vacio">
            {vacio}
          </p>
        )}

        {proximas.length > 0 && (
          <div
            className={
              diseno === 'carrusel'
                ? 'actividades-proximas__carrusel'
                : 'actividades-proximas__lista'
            }
          >
            {proximas.map((actividad) => (
              <Tarjeta
                key={actividad.id}
                {...{ [propTarjeta]: actividad }}
                {...(claseTarjeta && { className: claseTarjeta })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
