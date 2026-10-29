import SectionHeading from './SectionHeading'
import './Proceso.css'

const pasos = [
  {
    titulo: 'Elige y regístrate',
    descripcion:
      'Selecciona la modalidad que prefieras y aparta tu lugar con el formulario.',
  },
  {
    titulo: 'Recibe la información',
    descripcion:
      'Recibirás todo lo necesario para empezar desde el primer día.',
  },
  {
    titulo: 'Empieza',
    descripcion:
      'Sigue las sesiones y consulta tus dudas directo con el instructor.',
  },
]

export default function Proceso({ variant }) {
  return (
    <section className="proceso">
      <SectionHeading
        variant={variant}
        align="center"
        label="Proceso"
        title="Así de simple es empezar"
        description="Elige tu curso o evento, regístrate y recibe la confirmación. Luego accede a los materiales y sigue tu avance sin complicaciones."
      />

      <div className="proceso__pasos">
        {pasos.map((paso, i) => (
          <div key={paso.titulo} data-aparece>
            <div className="proceso__numero">
              {i + 1}
            </div>
            <h3 className="proceso__titulo">
              {paso.titulo}
            </h3>
            <p className="proceso__texto">{paso.descripcion}</p>
          </div>
        ))}
      </div>

      <div className="proceso__acciones">
        <a
          href="/registro"
          className="boton"
        >
          Registrarse
        </a>

      </div>
    </section>
  )
}
