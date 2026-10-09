import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ListaInscripciones from '../components/miscursos/ListaInscripciones'
import { useTitulo } from '../hooks/useTitulo'

export default function MisCursosPage() {
  useTitulo('Mis cursos')

  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <ListaInscripciones />
      </main>
      <Footer />
    </div>
  )
}
