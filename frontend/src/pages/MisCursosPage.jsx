import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ListaInscripciones from '../components/miscursos/ListaInscripciones'

export default function MisCursosPage() {
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
