import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ListaInscripciones from '../components/miscursos/ListaInscripciones'
import { useTitulo } from '../hooks/useTitulo'

export default function MisCursosPage() {
  useTitulo('Mis cursos')

  return (
    <div className="pagina">
      <Navbar />
      <main className="pagina__principal">
        <ListaInscripciones />
      </main>
      <Footer />
    </div>
  )
}
