import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import NetworkingPage from './pages/NetworkingPage'
import CursosPage from './pages/CursosPage'
import TalleresPage from './pages/TalleresPage'
import EventosPage from './pages/EventosPage'
import InscripcionPage from './pages/InscripcionPage'
import LoginPage from './pages/LoginPage'
import MisCursosPage from './pages/MisCursosPage'
import PagoResultadoPage from './pages/PagoResultadoPage'
import ActividadesAdminPage from './pages/admin/ActividadesAdminPage'
import ActividadAdminPage from './pages/admin/ActividadAdminPage'
import UsuariosAdminPage from './pages/admin/UsuariosAdminPage'
import RutaProtegida from './components/auth/RutaProtegida'
import RutaAdmin from './components/auth/RutaAdmin'
import LayoutAdmin from './components/admin/LayoutAdmin'
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

          {/* Panel de administración: su propia barra y menú lateral, sin la barra ni el pie del sitio */}
          <Route
            path="/admin"
            element={
              <RutaAdmin>
                <LayoutAdmin />
              </RutaAdmin>
            }
          >
            <Route index element={<Navigate to="actividades" replace />} />
            <Route path="actividades" element={<ActividadesAdminPage />} />
            <Route path="actividades/nueva" element={<ActividadAdminPage />} />
            <Route path="actividades/:id" element={<ActividadAdminPage />} />
            <Route path="usuarios" element={<UsuariosAdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
