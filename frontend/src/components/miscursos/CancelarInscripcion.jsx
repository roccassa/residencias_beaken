import { useState } from 'react'
import { apiPost } from '../../api/client'
import './CancelarInscripcion.css'

// Botón para dejar una inscripción antes de que empiece la actividad. Pide confirmación
// en la misma tarjeta; al cancelar, el lugar queda libre para otra persona.
// Si la inscripción ya estaba pagada, se avisa que el reembolso lo hace el equipo.
export default function CancelarInscripcion({ inscripcion, onCancelada }) {
  const [confirmando, setConfirmando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const pagada = inscripcion.estado === 'confirmada' && inscripcion.actividad.costo > 0

  async function cancelar() {
    setEnviando(true)
    setError(null)
    try {
      const resultado = await apiPost(`/inscripciones/${inscripcion.id}/cancelar`, {})
      onCancelada(inscripcion, resultado)
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  if (!confirmando) {
    return (
      <button type="button" onClick={() => setConfirmando(true)} className="cancelar-inscripcion__abrir">
        Cancelar inscripción
      </button>
    )
  }

  return (
    <div role="group" aria-label="Confirmar cancelación" className="cancelar-inscripcion">
      <p className="cancelar-inscripcion__texto">
        {pagada
          ? 'Tu lugar quedará libre para otra persona. Como ya pagaste, el equipo de Beaken te contactará por correo para hacer el reembolso.'
          : 'Tu lugar quedará libre para otra persona. Podrás volver a inscribirte mientras haya cupo.'}
      </p>
      <div className="cancelar-inscripcion__acciones">
        <button type="button" onClick={cancelar} disabled={enviando} className="cancelar-inscripcion__confirmar">
          {enviando ? 'Cancelando…' : 'Sí, cancelar'}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirmando(false)
            setError(null)
          }}
          disabled={enviando}
          className="boton boton--contorno boton--compacto"
        >
          No, conservarla
        </button>
      </div>
      {error && (
        <p role="alert" className="cancelar-inscripcion__error">
          {error}
        </p>
      )}
    </div>
  )
}
