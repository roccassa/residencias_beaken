import { useState } from 'react'
import SectionHeading from '../SectionHeading'

export default function FormularioEmpresa() {
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <div className="tw:grid tw:items-center tw:gap-12 tw:md:grid-cols-2">
        <div>
          <SectionHeading
            label="Empresas"
            title="¿Tu empresa se quiere sumar?"
            description="Déjanos tu correo y te contactamos para platicar cómo sumar a tu equipo."
          />

          {enviado ? (
            <p role="status" className="tw:mt-8 tw:text-sm tw:font-medium tw:text-emerald-800">
              ¡Gracias! Te contactaremos pronto.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="tw:mt-8">
              <div className="tw:flex tw:max-w-md tw:gap-2">
                <input
                  type="email"
                  name="correo-empresa"
                  required
                  aria-label="Correo electrónico"
                  placeholder="Tu correo electrónico"
                  className="tw:w-full tw:rounded-md tw:border tw:border-neutral-300 tw:bg-white tw:px-3 tw:py-2.5 tw:text-sm tw:text-neutral-900 tw:placeholder:text-neutral-400 tw:focus:border-blue-600 tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="tw:shrink-0 tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
                >
                  Enviar
                </button>
              </div>
              <p className="tw:mt-3 tw:text-xs tw:text-neutral-500">
                Al enviar aceptas nuestros términos y condiciones.
              </p>
            </form>
          )}
        </div>

        <div className="tw:flex tw:aspect-4/3 tw:items-center tw:justify-center tw:bg-neutral-200">
          <svg
            className="tw:size-14 tw:text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
      </div>
    </section>
  )
}
