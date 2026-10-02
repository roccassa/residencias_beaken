import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuthCard from '../components/auth/AuthCard'

export default function LoginPage() {
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
