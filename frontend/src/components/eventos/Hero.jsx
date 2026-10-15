import heroImg from '../../assets/images/heroEventos.jpg'
import '../Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <img
        src={heroImg}
        alt=""
        className="hero__imagen"
      />
      <div className="hero__velo" />

      <div className="hero__contenido">
        <h1 className="hero__titulo">
          Eventos para conectar
        </h1>
        <p className="hero__texto">
          Filtra por modalidad o categoría. Encuentra el curso o taller que
          buscas y aparta tu lugar.
        </p>
      </div>
    </section>
  )
}
