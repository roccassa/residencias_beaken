import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet, apiPost } from '../../api/client'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import TarjetaInscripcion from './TarjetaInscripcion'

export default function ListaInscripciones() {
  const [inscripciones, setInscripciones] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      const lista = await apiGet('/mis-inscripciones')
      if (!cancelado) setInscripciones(lista)
      return lista
    }

    // Mercado Pago no devuelve a la persona al sitio de forma automática, así que
    // al abrir Mis cursos se consulta el pago de las inscripciones con un pago ya
    // iniciado; si alguna quedó aprobada, se vuelve a cargar la lista.
    async function conciliarPagos(lista) {
      const pendientes = lista.filter((i) => i.estado === 'pendiente_pago' && i.pagoIniciado)
      const resultados = await Promise.allSettled(
        pendientes.map((i) => apiPost('/pagos/verificar', { inscripcionId: i.id })),
      )
      const cambio = resultados.some((r) => r.status === 'fulfilled' && r.value.estado === 'aprobado')
      if (cambio && !cancelado) await cargar()
    }

    cargar()
      .then(conciliarPagos)
      .catch((err) => !cancelado && setError(err))

    return () => {
      cancelado = true
    }
  }, [])

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading
            label="Registro"
            title="Tus cursos"
            description="Cursos, talleres y eventos en los que estás inscrito."
          />
        </div>

        <div>
          <EstadoCarga cargando={!inscripciones && !error} error={error} />

          {inscripciones?.length === 0 && (
            <div className="tw:border tw:border-dashed tw:border-neutral-300 tw:p-8 tw:text-center">
              <p className="tw:text-neutral-600">Aún no estás inscrito en ninguna actividad.</p>
              <Link
                to="/cursos"
                className="tw:mt-5 tw:inline-block tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
              >
                Explorar cursos
              </Link>
            </div>
          )}

          <div className="tw:space-y-12">
            {inscripciones?.map((inscripcion) => (
              <TarjetaInscripcion key={inscripcion.id} inscripcion={inscripcion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
