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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
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
