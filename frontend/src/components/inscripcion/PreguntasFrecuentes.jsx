import { useState } from 'react'
import SectionHeading from '../SectionHeading'

const preguntas = [
  {
    pregunta: '¿Cómo me registro?',
    respuesta:
      'Elige el curso, taller o evento que quieras. Llena el formulario con tus datos y recibe la confirmación por correo.',
  },
  {
    pregunta: '¿Qué modalidades hay?',
    respuesta:
      'Ofrecemos opciones presenciales y online. Cada actividad indica su modalidad en la descripción.',
  },
  {
    pregunta: '¿Cómo pago?',
    respuesta:
      'Los pagos se manejan mediante pago con tarjeta. Recibirás las instrucciones al confirmar tu inscripción.',
  },
  {
    pregunta: '¿Puedo cancelar?',
    respuesta:
      'Sí. Puedes cancelar hasta 48 horas antes del inicio y recibirás un reembolso completo.',
  },
]

export default function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState(0)

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Ayuda"
        title="Preguntas frecuentes"
        description="Resolvemos las dudas más comunes sobre registro, pagos, modalidades y cancelaciones."
      />

      <div className="tw:mt-10 tw:space-y-3">
        {preguntas.map((item, i) => {
          const open = abierta === i
          return (
            <div key={item.pregunta} className="tw:border tw:border-neutral-300 tw:bg-white">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setAbierta(open ? null : i)}
                className="tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-4 tw:px-5 tw:py-4 tw:text-left"
              >
                <span className="tw:font-semibold tw:text-neutral-900">{item.pregunta}</span>
                <span
                  aria-hidden="true"
                  className={`tw:text-2xl tw:leading-none tw:text-neutral-500 tw:transition-transform ${
                    open ? 'tw:rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open && (
                <p className="tw:px-5 tw:pb-4 tw:text-sm tw:text-neutral-600">{item.respuesta}</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="tw:mt-16">
        <h3 className="tw:text-xl tw:font-semibold tw:text-neutral-900">¿Aún tienes dudas?</h3>
        <p className="tw:mt-2 tw:text-neutral-600">
          Escríbenos por WhatsApp o redes sociales y te ayudamos.
        </p>
        <a
          href="#contacto"
          className="tw:mt-5 tw:inline-block tw:rounded-md tw:border tw:border-neutral-300 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50"
        >
          Contactar
        </a>
      </div>
    </section>
  )
}
