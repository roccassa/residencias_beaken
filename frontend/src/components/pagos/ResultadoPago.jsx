import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiPost } from '../../api/client'
import BotonPagar from './BotonPagar'
import SectionHeading from '../SectionHeading'

const MENSAJES = {
  aprobado: {
    titulo: '¡Pago aprobado!',
    texto: 'Tu lugar quedó confirmado. Puedes ver los detalles en Mis cursos.',
    caja: 'tw:border-emerald-300 tw:bg-emerald-50 tw:text-emerald-900',
  },
  pendiente: {
    titulo: 'Tu pago está en proceso',
    texto:
      'Mercado Pago aún está procesando el pago. Tu lugar se confirmará cuando se apruebe; revisa Mis cursos en unos minutos.',
    caja: 'tw:border-amber-300 tw:bg-amber-50 tw:text-amber-900',
  },
  rechazado: {
    titulo: 'No se pudo completar el pago',
    texto: 'El pago fue rechazado. Tu inscripción sigue pendiente: puedes intentarlo de nuevo.',
    caja: 'tw:border-rose-300 tw:bg-rose-50 tw:text-rose-900',
  },
  reembolsado: {
    titulo: 'Pago reembolsado',
    texto: 'Este pago fue reembolsado, por lo que la inscripción ya no está activa.',
    caja: 'tw:border-neutral-300 tw:bg-neutral-50 tw:text-neutral-900',
  },
  sin_pago: {
    titulo: 'Aún no hay un pago registrado',
    texto: 'No encontramos un pago para esta inscripción. Si cancelaste, puedes intentarlo de nuevo.',
    caja: 'tw:border-neutral-300 tw:bg-neutral-50 tw:text-neutral-900',
  },
}

// Mercado Pago devuelve a la persona aquí con ?payment_id=...&external_reference=...
// (o sin payment_id si canceló). Nada de eso se da por bueno: el servidor consulta
// a Mercado Pago y responde con el estado real.
export default function ResultadoPago() {
  const [params] = useSearchParams()
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const consultado = useRef(false)

  const paymentId = params.get('payment_id') ?? params.get('collection_id')
  const inscripcionId = params.get('external_reference')

  useEffect(() => {
    if (consultado.current) return
    consultado.current = true

    if (!paymentId && !inscripcionId) {
      setResultado({ estado: 'sin_pago' })
      return
    }
    apiPost('/pagos/verificar', paymentId ? { paymentId } : { inscripcionId })
      .then(setResultado)
      .catch(setError)
  }, [paymentId, inscripcionId])

  const mensaje = resultado && MENSAJES[resultado.estado]
  const puedeReintentar =
    resultado?.inscripcionId && ['rechazado', 'sin_pago'].includes(resultado.estado)

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Pago"
        title="Resultado de tu pago"
        description="Consultamos directamente a Mercado Pago para confirmar el estado."
      />

      <div className="tw:mt-10 tw:max-w-2xl">
        {!resultado && !error && (
          <p role="status" className="tw:text-neutral-500">
            Verificando tu pago…
          </p>
        )}

        {error && (
          <p role="alert" className="tw:border tw:border-rose-200 tw:bg-rose-50 tw:p-4 tw:text-sm tw:text-rose-800">
            {error.message}
          </p>
        )}

        {mensaje && (
          <div role="status" className={`tw:border tw:p-6 ${mensaje.caja}`}>
            <h3 className="tw:font-semibold">{mensaje.titulo}</h3>
            {resultado.titulo && <p className="tw:mt-1 tw:text-sm tw:font-medium">{resultado.titulo}</p>}
            <p className="tw:mt-1 tw:text-sm">{mensaje.texto}</p>
          </div>
        )}

        <div className="tw:mt-6 tw:flex tw:flex-wrap tw:items-start tw:gap-x-6 tw:gap-y-4">
          {puedeReintentar && <BotonPagar inscripcionId={resultado.inscripcionId} />}
          <Link
            to="/mis-cursos"
            className="tw:self-center tw:text-sm tw:font-medium tw:text-neutral-900 tw:underline tw:underline-offset-4"
          >
            Ir a Mis cursos
          </Link>
        </div>
      </div>
    </section>
  )
}
