import ImagenHero from '../../assets/images/heroInscripcion.jpg'
import '../Hero.css'

export default function Hero() {
  return (
    <section className="hero">
        <img
          src={ImagenHero}
          alt=""
          className="hero__imagen"
        />
      
      <div className="hero__velo" />

      <div className="hero__contenido hero__contenido--centrado">
        <p className="hero__etiqueta">
          Registro
        </p>
        <h1 className="hero__titulo hero__titulo--centrado">
          Inscríbete ahora
        </h1>
        <p className="hero__texto hero__texto--centrado">
          Elige tu curso, taller o evento. Aparta tu lugar en minutos y empieza
          a aprender.
        </p>
      </div>
    </section>
  )
}
