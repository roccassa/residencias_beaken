import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import CursosPage from './pages/CursosPage'
import TalleresPage from './pages/TalleresPage'
import EventosPage from './pages/EventosPage'
import InscripcionPage from './pages/InscripcionPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CursosPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/talleres" element={<TalleresPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/registro" element={<InscripcionPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
