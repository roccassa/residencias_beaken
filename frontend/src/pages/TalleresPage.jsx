import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/talleres/Hero'
import AgendaTalleres from '../components/talleres/AgendaTalleres'
import Ventajas from '../components/talleres/Ventajas'
import Proceso from '../components/Proceso'
import CtaBanner from '../components/CtaBanner'
import Contacto from '../components/Contacto'

export default function TalleresPage() {
  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <Hero />
        <AgendaTalleres />
        <div className="tw:bg-fondo-claro-secciones">
          <Ventajas />
        </div>
        <Proceso />
        <div className="tw:bg-fondo-claro-secciones">
          <CtaBanner />
        </div>
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
