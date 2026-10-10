import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'

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
    <section id={id} className="tw:mx-auto tw:max-w-6xl tw:scroll-mt-6 tw:px-6 tw:py-20">
      <div className="tw:flex tw:flex-col tw:justify-between tw:gap-4 tw:sm:flex-row tw:sm:items-end">
        <SectionHeading label={label} title={title} description={description} />
        <Link
          to={destino}
          className="tw:inline-flex tw:h-fit tw:w-fit tw:shrink-0 tw:items-center tw:rounded-md tw:bg-neutral-900 tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
        >
          {textoVerTodos}
        </Link>
      </div>

      <div className="tw:mt-8">
        <EstadoCarga cargando={cargando} error={error} />

        {!cargando && !error && proximas.length === 0 && (
          <p className="tw:border tw:border-dashed tw:border-neutral-300 tw:p-8 tw:text-center tw:text-neutral-500">
            {vacio}
          </p>
        )}

        {proximas.length > 0 && (
          <div
            className={
              diseno === 'carrusel'
                ? 'tw:flex tw:snap-x tw:gap-4 tw:overflow-x-auto tw:pb-2'
                : 'tw:space-y-4'
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
