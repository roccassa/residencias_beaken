import heroImg from '../../assets/images/heroEventos.jpg'

export default function Hero() {
  return (
    <section className="tw:relative tw:isolate tw:overflow-hidden">
      <img
        src={heroImg}
        alt=""
        className="tw:absolute tw:inset-0 tw:-z-10 tw:size-full tw:object-cover"
      />
      <div className="tw:absolute tw:inset-0 tw:-z-10 tw:bg-neutral-900/50" />

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-24 tw:text-white tw:md:py-60">
        <h1 className="tw:max-w-lg tw:text-5xl tw:font-medium tw:tracking-tight tw:md:text-7xl">
          Eventos para conectar
        </h1>
        <p className="tw:mt-8 tw:max-w-md tw:text-neutral-200 tw:text-xl tw:font-bold">
          Filtra por modalidad o categoría. Encuentra el curso o taller que
          buscas y aparta tu lugar.
        </p>
      </div>
    </section>
  )
}
