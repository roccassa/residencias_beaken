import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, User, X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import logotipo from '../../assets/images/logotipo.png'
import './Navbar.css'

const links = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
]

// Contenido del menú "Más". El catálogo es la página principal (Networking).
const enlacesMas = [{ label: 'Catálogo de actividades', to: '/' }]

// Páginas que pertenecen al catálogo: "Más" se marca como activo en ellas.
const RUTAS_CATALOGO = ['/', '/cursos', '/talleres', '/eventos']

export default function Navbar() {
  const [menuUsuario, setMenuUsuario] = useState(false)
  const [menuMas, setMenuMas] = useState(false)
  const [menuMovil, setMenuMovil] = useState(false)
  const { usuario, cargando, logout } = useAuth()
  const { pathname } = useLocation()
  const refMas = useRef(null)
  const catalogoActivo = RUTAS_CATALOGO.includes(pathname)

  useEffect(() => {
    if (!menuMovil && !menuMas) return
    const cerrarConEscape = (e) => {
      if (e.key !== 'Escape') return
      setMenuMovil(false)
      setMenuMas(false)
    }
    const cerrarAlHacerClicFuera = (e) => {
      if (refMas.current && !refMas.current.contains(e.target)) setMenuMas(false)
    }
    document.addEventListener('keydown', cerrarConEscape)
    document.addEventListener('mousedown', cerrarAlHacerClicFuera)
    return () => {
      document.removeEventListener('keydown', cerrarConEscape)
      document.removeEventListener('mousedown', cerrarAlHacerClicFuera)
    }
  }, [menuMovil, menuMas])

  const clasesBotonMas = ['navbar__enlace', 'navbar__enlace--mas']
  if (catalogoActivo) clasesBotonMas.push('navbar__enlace--activo')
  if (menuMas) clasesBotonMas.push('navbar__enlace--abierto')

  return (
    <header className="navbar">
      <nav className="navbar__barra">
        <Link to="/">
          <img src={logotipo} alt="Beaken" className="navbar__logotipo" />
        </Link>

        <ul className="navbar__enlaces">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar__enlace">
                {link.label}
              </a>
            </li>
          ))}
          <li ref={refMas} className="navbar__mas">
            <button
              type="button"
              aria-expanded={menuMas}
              aria-haspopup="menu"
              onClick={() => setMenuMas((v) => !v)}
              className={clasesBotonMas.join(' ')}
            >
              Más
              <ChevronDown
                className={`navbar__flecha navbar__flecha--mas${menuMas ? ' navbar__flecha--girada' : ''}`}
                aria-hidden="true"
              />
            </button>

            {menuMas && (
              <ul role="menu" className="navbar__desplegable">
                {enlacesMas.map((item) => (
                  <li key={item.label} role="none">
                    <Link
                      to={item.to}
                      role="menuitem"
                      onClick={() => setMenuMas(false)}
                      className="navbar__desplegable-enlace"
                    >
                      {item.label}
                      <ArrowUpRight className="navbar__flecha-enlace" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        <button
          type="button"
          aria-label={menuMovil ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuMovil}
          aria-controls="menu-movil"
          onClick={() => setMenuMovil((v) => !v)}
          className="navbar__hamburguesa"
        >
          {menuMovil ? (
            <X className="navbar__icono-menu" aria-hidden="true" />
          ) : (
            <Menu className="navbar__icono-menu" aria-hidden="true" />
          )}
        </button>

        <div className="navbar__acciones">
          {!cargando &&
            (usuario ? (
              <div className="navbar__usuario">
                <button
                  type="button"
                  aria-expanded={menuUsuario}
                  aria-label={`Menú de ${usuario.nombre}`}
                  onClick={() => setMenuUsuario((v) => !v)}
                  className="navbar__enlace navbar__enlace--usuario"
                >
                  <User className="navbar__icono-cuenta" aria-hidden="true" />
                  <span className="navbar__saludo">Hola, {usuario.nombre.split(' ')[0]}</span>
                  <ChevronDown className="navbar__flecha" aria-hidden="true" />
                </button>

                {menuUsuario && (
                  <ul className="navbar__menu-usuario">
                    <li>
                      <Link
                        to="/mis-cursos"
                        onClick={() => setMenuUsuario(false)}
                        className="navbar__menu-usuario-opcion"
                      >
                        Mis cursos
                      </Link>
                    </li>
                    {usuario.rol === 'admin' && (
                      <li>
                        <Link
                          to="/admin"
                          onClick={() => setMenuUsuario(false)}
                          className="navbar__menu-usuario-opcion"
                        >
                          Panel de administración
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuUsuario(false)
                          logout().catch(() => {})
                        }}
                        className="navbar__menu-usuario-opcion"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                aria-label="Iniciar sesión"
                className="navbar__enlace navbar__enlace--cuenta"
              >
                <User className="navbar__icono-cuenta" aria-hidden="true" />
                <span className="navbar__saludo">Iniciar sesión</span>
              </Link>
            ))}
          <Link to="/registro" className="navbar__boton navbar__boton--contorno">
            Inscribirme
          </Link>
          <a href="/contacto" className="navbar__boton navbar__boton--contacto">
            <span className="navbar__punto" aria-hidden="true" />
            Contacto
          </a>
        </div>
      </nav>

      {menuMovil && (
        <div
          id="menu-movil"
          onClick={(e) => e.target.closest('a') && setMenuMovil(false)}
          className="navbar__movil"
        >
          <ul className="navbar__movil-lista">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="navbar__enlace navbar__enlace--movil">
                  {link.label}
                </a>
              </li>
            ))}
            {enlacesMas.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="navbar__enlace navbar__enlace--movil navbar__enlace--con-flecha"
                >
                  {item.label}
                  <ArrowUpRight className="navbar__flecha-enlace" aria-hidden="true" />
                </Link>
              </li>
            ))}
            {!cargando && (
              <li className="navbar__movil-cuenta">
                {usuario ? (
                  <>
                    <p className="navbar__movil-saludo">Hola, {usuario.nombre.split(' ')[0]}</p>
                    <Link to="/mis-cursos" className="navbar__movil-opcion">
                      Mis cursos
                    </Link>
                    {usuario.rol === 'admin' && (
                      <Link to="/admin" className="navbar__movil-opcion">
                        Panel de administración
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuMovil(false)
                        logout().catch(() => {})
                      }}
                      className="navbar__movil-opcion"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="navbar__enlace navbar__enlace--movil-cuenta">
                    Iniciar sesión
                  </Link>
                )}
              </li>
            )}
          </ul>

          <div className="navbar__movil-botones">
            <Link to="/registro" className="navbar__boton navbar__boton--contorno">
              Inscribirme
            </Link>
            <a href="/contacto" className="navbar__boton navbar__boton--contacto">
              <span className="navbar__punto" aria-hidden="true" />
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
