import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronDown, ExternalLink, LogOut, Users } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import './LayoutAdmin.css'

const secciones = [
  { label: 'Actividades', to: '/admin/actividades', icon: CalendarDays },
  { label: 'Usuarios', to: '/admin/usuarios', icon: Users },
]

// Estructura del panel: barra superior, menú lateral y, a la derecha, la página elegida.
export default function LayoutAdmin() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [menuCuenta, setMenuCuenta] = useState(false)
  const refCuenta = useRef(null)

  useEffect(() => {
    if (!menuCuenta) return
    const cerrarConEscape = (e) => e.key === 'Escape' && setMenuCuenta(false)
    const cerrarAlHacerClicFuera = (e) => {
      if (refCuenta.current && !refCuenta.current.contains(e.target)) setMenuCuenta(false)
    }
    document.addEventListener('keydown', cerrarConEscape)
    document.addEventListener('mousedown', cerrarAlHacerClicFuera)
    return () => {
      document.removeEventListener('keydown', cerrarConEscape)
      document.removeEventListener('mousedown', cerrarAlHacerClicFuera)
    }
  }, [menuCuenta])

  // Primero se sale del panel y luego se cierra la sesión, para no pasar por el login.
  function cerrarSesion() {
    setMenuCuenta(false)
    navigate('/')
    logout().catch(() => {})
  }

  return (
    <div className="admin">
      <header className="admin__barra">
        <Link to="/admin" className="admin__marca">
          Beaken <span className="admin__marca-separador">·</span> Administración
        </Link>

        <div ref={refCuenta} className="admin__cuenta">
          <button
            type="button"
            aria-expanded={menuCuenta}
            aria-haspopup="menu"
            onClick={() => setMenuCuenta((v) => !v)}
            className="admin__cuenta-boton"
          >
            <span className="admin__cuenta-correo">{usuario.correo}</span>
            <ChevronDown className="admin__cuenta-flecha" aria-hidden="true" />
          </button>

          {menuCuenta && (
            <ul role="menu" className="admin__cuenta-menu">
              <li role="none">
                <Link to="/" role="menuitem" className="admin__cuenta-opcion">
                  Ver el sitio
                </Link>
              </li>
              <li role="none">
                <button type="button" role="menuitem" onClick={cerrarSesion} className="admin__cuenta-opcion">
                  Cerrar sesión
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>

      <div className="admin__cuerpo">
        <nav aria-label="Secciones del panel" className="admin__lateral">
          <ul className="admin__secciones">
            {secciones.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `admin__seccion${isActive ? ' admin__seccion--activa' : ''}`
                  }
                >
                  <Icon className="admin__seccion-icono" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="admin__secciones admin__secciones--pie">
            <li>
              <Link to="/" className="admin__seccion">
                <ExternalLink className="admin__seccion-icono" aria-hidden="true" />
                Ver el sitio
              </Link>
            </li>
            <li>
              <button type="button" onClick={cerrarSesion} className="admin__seccion">
                <LogOut className="admin__seccion-icono" aria-hidden="true" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>

        <main className="admin__contenido">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
