import imagenSumarEmpresa from '../../assets/images/imagen2.jpg';

import { useState } from 'react'
import { apiPost } from '../../api/client'
import { inputClass } from '../CampoFormulario'
import SectionHeading from '../SectionHeading'
import './FormularioEmpresa.css'

export default function FormularioEmpresa() {
  const [resultado, setResultado] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const correo = new FormData(e.currentTarget).get('correo-empresa')
    setEnviando(true)
    setError(null)

    try {
      setResultado(await apiPost('/empresas/interes', { correo }))
    } catch (err) {
      setError(err)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="formulario-empresa">
      <div className="formulario-empresa__rejilla">
        <div>
          <SectionHeading
            label="Empresas"
            title="¿Tu empresa se quiere sumar?"
            description="Déjanos tu correo y te contactamos para platicar cómo sumar a tu equipo."
          />

          {resultado ? (
            <p role="status" className="formulario-empresa__exito">
              {resultado.mensaje}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="formulario-empresa__formulario">
              <div className="formulario-empresa__fila">
                <input
                  type="email"
                  name="correo-empresa"
                  required
                  aria-label="Correo electrónico"
                  placeholder="Tu correo electrónico"
                  className={inputClass}
                />
                <button
                  type="submit"
                  disabled={enviando}
                  className="boton formulario-empresa__boton"
                >
                  {enviando ? 'Enviando…' : 'Enviar'}
                </button>
              </div>
              {error && (
                <p role="alert" className="formulario-empresa__error">
                  {error.campos?.correo ?? error.message}
                </p>
              )}
              <p className="formulario-empresa__nota">
                Al enviar aceptas nuestros términos y condiciones.
              </p>
            </form>
          )}
        </div>

        <div className="formulario-empresa__imagen">
          <img
            src={imagenSumarEmpresa}  
            alt=""
            className="formulario-empresa__foto"
          />
        </div>
      </div>
    </section>
  )
}
