import heroImg from '../../assets/images/hero1.jpg'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-neutral-900/50" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 text-white md:py-32">
        <h1 className="max-w-lg text-4xl font-medium tracking-tight md:text-5xl">
          Cursos para aprender
        </h1>
        <p className="mt-4 max-w-md text-neutral-200">
          Filtra por modalidad o categoría. Encuentra el curso o taller que
          buscas y aparta tu lugar.
        </p>
      </div>
    </section>
  )
}
