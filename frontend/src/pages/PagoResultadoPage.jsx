import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ResultadoPago from '../components/pagos/ResultadoPago'
import { useTitulo } from '../hooks/useTitulo'

export default function PagoResultadoPage() {
  useTitulo('Resultado del pago')

  return (
    <div className="pagina">
      <Navbar />
      <main className="pagina__principal">
        <ResultadoPago />
      </main>
      <Footer />
    </div>
  )
}
