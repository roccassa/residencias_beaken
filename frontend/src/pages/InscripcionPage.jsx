import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/inscripcion/Hero'
import FormularioInscripcion from '../components/inscripcion/FormularioInscripcion'
import FormularioEmpresa from '../components/inscripcion/FormularioEmpresa'
import PreguntasFrecuentes from '../components/inscripcion/PreguntasFrecuentes'
import Contacto from '../components/Contacto'
import { useTitulo } from '../hooks/useTitulo'

export default function InscripcionPage() {
  useTitulo('Inscripción')

  return (
    <div className="pagina">
      <Navbar />
      <main className="pagina__principal">
        <Hero />
        <FormularioInscripcion />
        <div className="pagina__franja-clara">
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
