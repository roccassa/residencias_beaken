import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuthCard from '../components/auth/AuthCard'
import { useTitulo } from '../hooks/useTitulo'

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  useTitulo(searchParams.get('modo') === 'registro' ? 'Crear cuenta' : 'Iniciar sesión')

  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col">
      <Navbar />
      <main className="tw:flex-1">
        <AuthCard />
      </main>
      <Footer />
    </div>
  )
}
