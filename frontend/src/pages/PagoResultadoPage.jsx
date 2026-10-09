import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ResultadoPago from '../components/pagos/ResultadoPago'
import { useTitulo } from '../hooks/useTitulo'

export default function PagoResultadoPage() {
  useTitulo('Resultado del pago')

  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <ResultadoPago />
      </main>
      <Footer />
    </div>
  )
}
