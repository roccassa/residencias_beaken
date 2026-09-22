import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/eventos/Hero'
import AgendaEventos from '../components/eventos/AgendaEventos'
import Ventajas from '../components/eventos/Ventajas'
import CtaBanner from '../components/CtaBanner'
import Contacto from '../components/Contacto'

export default function EventosPage() {
  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <Hero />
        <AgendaEventos />
        <div className="tw:bg-fondo-claro-secciones">
          <Ventajas />
        </div>
        <CtaBanner
          description="Los cupos son limitados y las fechas se confirman rápido. No dejes pasar la oportunidad de aprender algo nuevo."
          primaryLabel="Registrarse"
        />
        <div>
          <Contacto />
        </div>
      </main>
      <Footer />
    </div>
  )
}
