import { useState } from 'react'
import { apiPost } from '../../api/client'
import './BotonPagar.css'

// Pide al servidor la preferencia de pago y envía a la persona a Mercado Pago.
export default function BotonPagar({ inscripcionId, className = '' }) {
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  async function pagar() {
    setEnviando(true)
    setError(null)
    try {
      const { url } = await apiPost(`/inscripciones/${inscripcionId}/pagar`, {})
      window.location.assign(url)
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={pagar}
        disabled={enviando}
        className="boton"
      >
        {enviando ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}
      </button>
      {error && (
        <p role="alert" className="boton-pagar__error">
          {error}
        </p>
      )}
    </div>
  )
}
