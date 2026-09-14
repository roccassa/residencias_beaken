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

export default function Proceso() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <p className="text-sm font-semibold text-neutral-500">Proceso</p>
      <h2 className="mt-2 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
        Así de simple es empezar
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-neutral-600">
        Elige tu curso o evento, regístrate y recibe la confirmación. Luego
        accede a los materiales y sigue tu avance sin complicaciones.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {pasos.map((paso, i) => (
          <div key={paso.titulo}>
            <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-neutral-300 text-sm font-medium text-neutral-500">
              {i + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              {paso.titulo}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">{paso.descripcion}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <a
          href="/registro"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Registrarse
        </a>
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-neutral-900 hover:text-neutral-500">
          Más
          <span aria-hidden="true">›</span>
        </a>
      </div>
    </section>
  )
}
