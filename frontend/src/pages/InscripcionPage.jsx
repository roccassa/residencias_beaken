import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/inscripcion/Hero'
import FormularioInscripcion from '../components/inscripcion/FormularioInscripcion'
import FormularioEmpresa from '../components/inscripcion/FormularioEmpresa'
import PreguntasFrecuentes from '../components/inscripcion/PreguntasFrecuentes'
import Contacto from '../components/Contacto'

export default function InscripcionPage() {
  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <Hero />
        <FormularioInscripcion />
        <div className="tw:bg-fondo-claro-secciones">
          <FormularioEmpresa />
        </div>
        <div >
          <PreguntasFrecuentes />
        </div>
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
