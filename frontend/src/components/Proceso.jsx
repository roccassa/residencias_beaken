import SectionHeading from './SectionHeading'

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
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20 tw:text-center">
      <SectionHeading
        variant={variant}
        align="center"
        label="Proceso"
        title="Así de simple es empezar"
        description="Elige tu curso o evento, regístrate y recibe la confirmación. Luego accede a los materiales y sigue tu avance sin complicaciones."
      />

      <div className="tw:mt-12 tw:grid tw:gap-10 tw:sm:grid-cols-3">
        {pasos.map((paso, i) => (
          <div key={paso.titulo}>
            <div className="tw:mx-auto tw:flex tw:size-10 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-neutral-300 tw:text-sm tw:font-medium tw:text-neutral-500">
              {i + 1}
            </div>
            <h3 className="tw:mt-4 tw:text-lg tw:font-semibold tw:text-neutral-900">
              {paso.titulo}
            </h3>
            <p className="tw:mt-2 tw:text-sm tw:text-neutral-600">{paso.descripcion}</p>
          </div>
        ))}
      </div>

      <div className="tw:mt-10 tw:flex tw:items-center tw:justify-center tw:gap-6">
        <a
          href="/registro"
          className="tw:rounded-md tw:bg-neutral-900 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
        >
          Registrarse
        </a>
        <a href="#" className="tw:flex tw:items-center tw:gap-1 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500">
          Más
          <span aria-hidden="true">›</span>
        </a>
      </div>
    </section>
  )
}
