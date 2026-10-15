import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/cursos/Hero'
import AgendaCursos from '../components/cursos/AgendaCursos'
import Ventajas from '../components/cursos/Ventajas'
import Proceso from '../components/Proceso'
import CtaBanner from '../components/CtaBanner'
import Contacto from '../components/Contacto'
import { useTitulo } from '../hooks/useTitulo'

export default function CursosPage() {
  useTitulo('Cursos')

  return (
    <div className="pagina">
      <Navbar />
      <main className="pagina__principal">
        <Hero />
        <AgendaCursos />
        <div className="pagina__franja-clara"> 
          <Ventajas />
        </div>
        <Proceso />
        <div className="pagina__franja-clara">
          <CtaBanner />
        </div>
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
