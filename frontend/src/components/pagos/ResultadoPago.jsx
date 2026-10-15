import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiPost } from '../../api/client'
import BotonPagar from './BotonPagar'
import SectionHeading from '../SectionHeading'
import './ResultadoPago.css'

const MENSAJES = {
  aprobado: {
    titulo: '¡Pago aprobado!',
    texto: 'Tu lugar quedó confirmado. Puedes ver los detalles en Mis cursos.',
    caja: 'resultado-pago__caja--aprobado',
  },
  pendiente: {
    titulo: 'Tu pago está en proceso',
    texto:
      'Mercado Pago aún está procesando el pago. Tu lugar se confirmará cuando se apruebe; revisa Mis cursos en unos minutos.',
    caja: 'resultado-pago__caja--pendiente',
  },
  rechazado: {
    titulo: 'No se pudo completar el pago',
    texto: 'El pago fue rechazado. Tu inscripción sigue pendiente: puedes intentarlo de nuevo.',
    caja: 'resultado-pago__caja--rechazado',
  },
  reembolsado: {
    titulo: 'Pago reembolsado',
    texto: 'Este pago fue reembolsado, por lo que la inscripción ya no está activa.',
    caja: 'resultado-pago__caja--neutra',
  },
  sin_pago: {
    titulo: 'Aún no hay un pago registrado',
    texto: 'No encontramos un pago para esta inscripción. Si cancelaste, puedes intentarlo de nuevo.',
    caja: 'resultado-pago__caja--neutra',
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
    <section className="resultado-pago">
      <SectionHeading
        label="Pago"
        title="Resultado de tu pago"
        description="Consultamos directamente a Mercado Pago para confirmar el estado."
      />

      <div className="resultado-pago__contenido">
        {!resultado && !error && (
          <p role="status" className="resultado-pago__verificando">
            Verificando tu pago…
          </p>
        )}

        {error && (
          <p role="alert" className="resultado-pago__error">
            {error.message}
          </p>
        )}

        {mensaje && (
          <div role="status" className={`resultado-pago__caja ${mensaje.caja}`}>
            <h3 className="resultado-pago__caja-titulo">{mensaje.titulo}</h3>
            {resultado.titulo && <p className="resultado-pago__caja-actividad">{resultado.titulo}</p>}
            <p className="resultado-pago__caja-texto">{mensaje.texto}</p>
          </div>
        )}

        <div className="resultado-pago__acciones">
          {puedeReintentar && <BotonPagar inscripcionId={resultado.inscripcionId} />}
          <Link
            to="/mis-cursos"
            className="resultado-pago__enlace"
          >
            Ir a Mis cursos
          </Link>
        </div>
      </div>
    </section>
  )
}
