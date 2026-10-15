import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet, apiPost } from '../../api/client'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import TarjetaInscripcion from './TarjetaInscripcion'
import './ListaInscripciones.css'

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
    <section className="mis-cursos">
      <div className="mis-cursos__rejilla">
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
            <div className="mis-cursos__vacio">
              <p className="mis-cursos__vacio-texto">Aún no estás inscrito en ninguna actividad.</p>
              <Link
                to="/cursos"
                className="boton mis-cursos__boton"
              >
                Explorar cursos
              </Link>
            </div>
          )}

          <div className="mis-cursos__lista">
            {inscripciones?.map((inscripcion) => (
              <TarjetaInscripcion key={inscripcion.id} inscripcion={inscripcion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
