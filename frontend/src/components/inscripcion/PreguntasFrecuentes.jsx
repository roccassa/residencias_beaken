import { useState } from 'react'
import SectionHeading from '../SectionHeading'
import './PreguntasFrecuentes.css'

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
      'Sí. Puedes cancelar hasta que empiece la actividad; si ya pagaste, recibirás el reembolso',
  },
]

export default function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState(0)

  return (
    <section className="preguntas">
      <SectionHeading
        label="Ayuda"
        title="Preguntas frecuentes"
        description="Resolvemos las dudas más comunes sobre registro, pagos, modalidades y cancelaciones."
      />

      <div className="preguntas__lista">
        {preguntas.map((item, i) => {
          const open = abierta === i
          return (
            <div key={item.pregunta} className="preguntas__item" data-aparece>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setAbierta(open ? null : i)}
                className="preguntas__pregunta"
              >
                <span className="preguntas__texto-pregunta">{item.pregunta}</span>
                <span
                  aria-hidden="true"
                  className={`preguntas__signo${open ? ' preguntas__signo--girado' : ''}`}
                >
                  +
                </span>
              </button>
              <div
                className={`preguntas__panel${open ? ' preguntas__panel--abierto' : ''}`}
                aria-hidden={!open}
              >
                <div className="preguntas__panel-interior">
                  <p className="preguntas__respuesta">{item.respuesta}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="preguntas__dudas">
        <h3 className="preguntas__dudas-titulo">¿Aún tienes dudas?</h3>
        <p className="preguntas__dudas-texto">
          Escríbenos por WhatsApp o redes sociales y te ayudamos.
        </p>
        <a
          href="#contacto"
          className="boton boton--contorno preguntas__boton"
        >
          Contactar
        </a>
      </div>
    </section>
  )
}
