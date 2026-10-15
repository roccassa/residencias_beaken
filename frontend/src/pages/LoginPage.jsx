import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuthCard from '../components/auth/AuthCard'
import { useTitulo } from '../hooks/useTitulo'

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  useTitulo(searchParams.get('modo') === 'registro' ? 'Crear cuenta' : 'Iniciar sesión')

  return (
    <div className="pagina">
      <Navbar />
      <main className="pagina__principal">
        <AuthCard />
      </main>
      <Footer />
    </div>
  )
}
