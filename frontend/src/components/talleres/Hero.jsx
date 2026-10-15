import heroImg from '../../assets/images/heroTalleres.jpg'
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
          Talleres para crecer
        </h1>
        <p className="hero__texto">
          Conecta y encuentra el curso o taller que
          buscas y aparta tu lugar.
        </p>
      </div>
    </section>
  )
}
