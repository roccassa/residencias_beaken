import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/talleres/Hero'
import AgendaTalleres from '../components/talleres/AgendaTalleres'
import Ventajas from '../components/talleres/Ventajas'
import Proceso from '../components/Proceso'
import CtaBanner from '../components/CtaBanner'
import Contacto from '../components/Contacto'
import { useTitulo } from '../hooks/useTitulo'

export default function TalleresPage() {
  useTitulo('Talleres')

  return (
    <div className="pagina">
      <Navbar />
      <main className="pagina__principal">
        <Hero />
        <AgendaTalleres />
        <div className="pagina__franja-clara">
          <Ventajas />
        </div>
        <Proceso variant="dot" />
        <div className="pagina__franja-clara">
          <CtaBanner />
        </div>
        <Contacto variant="dot" />
      </main>
      <Footer />
    </div>
  )
}
