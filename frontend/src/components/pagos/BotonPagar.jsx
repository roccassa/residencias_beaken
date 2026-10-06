import { useState } from 'react'
import { apiPost } from '../../api/client'

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
        className="tw:cursor-pointer tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700 tw:disabled:cursor-not-allowed tw:disabled:opacity-60"
      >
        {enviando ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}
      </button>
      {error && (
        <p role="alert" className="tw:mt-2 tw:text-sm tw:text-rose-700">
          {error}
        </p>
      )}
    </div>
  )
}
