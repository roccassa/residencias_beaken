import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/cursos/Hero'
import AgendaCursos from '../components/cursos/AgendaCursos'
import Ventajas from '../components/cursos/Ventajas'
import Proceso from '../components/cursos/Proceso'
import CtaBanner from '../components/CtaBanner'
import Contacto from '../components/Contacto'

export default function CursosPage() {
  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <Hero />
        <AgendaCursos />
        <Ventajas />
        <Proceso />
        <CtaBanner />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
