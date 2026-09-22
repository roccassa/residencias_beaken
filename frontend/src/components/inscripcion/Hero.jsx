import ImagenHero from '../../assets/images/heroInscripcion.jpg'

export default function Hero() {
  return (
    <section className="tw:relative tw:isolate tw:overflow-hidden">
        <img
          src={ImagenHero}
          alt=""
          className="tw:absolute tw:inset-0 tw:-z-10 tw:size-full tw:object-cover"
        />
      
      <div className="tw:absolute tw:inset-0 tw:-z-10 tw:bg-neutral-900/50" />

      <div className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-24 tw:text-center tw:md:py-60">
        <p className="tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-neutral-200">
          Registro
        </p>
        <h1 className="tw:mt-3 tw:text-5xl tw:font-medium tw:tracking-tight tw:md:text-6xl tw:text-white">
          Inscríbete ahora
        </h1>
        <p className="tw:mx-auto tw:mt-6 tw:max-w-xl tw:text-lg tw:text-neutral-200">
          Elige tu curso, taller o evento. Aparta tu lugar en minutos y empieza
          a aprender.
        </p>
      </div>
    </section>
  )
}
