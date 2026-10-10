import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import NetworkingPage from './pages/NetworkingPage'
import CursosPage from './pages/CursosPage'
import TalleresPage from './pages/TalleresPage'
import EventosPage from './pages/EventosPage'
import InscripcionPage from './pages/InscripcionPage'
import LoginPage from './pages/LoginPage'
import MisCursosPage from './pages/MisCursosPage'
import PagoResultadoPage from './pages/PagoResultadoPage'
import RutaProtegida from './components/auth/RutaProtegida'
import ScrollAlInicio from './components/ScrollAlInicio'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollAlInicio />
        <Routes>
          <Route path="/" element={<NetworkingPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/talleres" element={<TalleresPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/registro" element={<InscripcionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/mis-cursos"
            element={
              <RutaProtegida>
                <MisCursosPage />
              </RutaProtegida>
            }
          />
          <Route
            path="/pago/resultado"
            element={
              <RutaProtegida>
                <PagoResultadoPage />
              </RutaProtegida>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
