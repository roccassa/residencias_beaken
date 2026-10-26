import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

// Solo deja pasar a cuentas con rol de administrador. Esto solo decide qué se muestra:
// la protección real está en el servidor, que revisa el rol en cada petición del panel.
export default function RutaAdmin({ children }) {
  const { usuario, cargando } = useAuth()
  const { pathname } = useLocation()

  if (cargando) return null
  if (!usuario) return <Navigate to={`/login?volver=${encodeURIComponent(pathname)}`} replace />
  if (usuario.rol !== 'admin') return <Navigate to="/" replace />
  return children
}
