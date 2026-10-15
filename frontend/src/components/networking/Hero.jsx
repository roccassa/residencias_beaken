import { Link } from 'react-router-dom'
import heroImg from '../../assets/images/heroInscripcion.jpg'
import miniImg from '../../assets/images/heroInscripcion2.jpg'
import './Hero.css'

export default function Hero() {
  return (
    <section>
      <div className="portada__fondo">
        <img src={heroImg} alt="" className="portada__imagen" />
        <div className="portada__miniatura-zona">
          <div className="portada__miniatura-fila">
            <img src={miniImg} alt="" className="portada__miniatura" />
          </div>
        </div>
      </div>

      <div className="portada__texto">
        <h1 className="portada__titulo">Aprende algo nuevo hoy</h1>
        <div>
          <p className="portada__descripcion">
            Cursos, talleres y eventos presenciales y en línea. Encuentra el que encaje contigo
            y regístrate.
          </p>
          <div className="portada__botones">
            <a href="#cursos" className="boton">
              Explorar actividades
            </a>
            <Link to="/registro" className="boton boton--contorno">
              Inscribirme
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
