import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, User, X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import logotipo from '../../assets/images/logotipo.png'

const links = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
]

// Contenido del menú "Más". El catálogo es la página principal (Networking).
const enlacesMas = [{ label: 'Catálogo de actividades', to: '/' }]

// Páginas que pertenecen al catálogo: "Más" se marca como activo en ellas.
const RUTAS_CATALOGO = ['/', '/cursos', '/talleres', '/eventos']

const textoNav =
  'tw:text-[13px] tw:font-bold tw:uppercase tw:tracking-wider tw:text-fondo-oscuro-secciones'
const botonContacto =
  'tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-sm tw:bg-[#ff0054] tw:px-5 tw:py-3 tw:text-[13px] tw:font-bold tw:uppercase tw:tracking-wider tw:text-white tw:hover:bg-[#d9004a]'

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

  return (
    <header className="tw:border-b tw:border-neutral-200">
      <nav className="tw:mx-auto tw:flex tw:max-w-6xl tw:items-center tw:justify-between tw:px-6 tw:py-5">
        <Link to="/">
          <img src={logotipo} alt="Beaken" className="tw:h-8 tw:w-auto" />
        </Link>

        <ul className="tw:hidden tw:items-center tw:gap-5 tw:md:flex tw:lg:gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={`${textoNav} tw:hover:text-blue-600`}>
                {link.label}
              </a>
            </li>
          ))}
          <li ref={refMas} className="tw:relative">
            <button
              type="button"
              aria-expanded={menuMas}
              aria-haspopup="menu"
              onClick={() => setMenuMas((v) => !v)}
              className={`${textoNav} tw:flex tw:cursor-pointer tw:items-center tw:gap-1 tw:border-b-2 tw:py-1 ${
                catalogoActivo ? 'tw:border-blue-600 tw:text-blue-600' : 'tw:border-transparent'
              } ${menuMas ? 'tw:text-neutral-500' : catalogoActivo ? '' : 'tw:hover:text-blue-600'}`}
            >
              Más
              <ChevronDown
                className={`tw:size-4 tw:transition-transform ${menuMas ? 'tw:rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {menuMas && (
              <ul
                role="menu"
                className="tw:absolute tw:right-0 tw:top-full tw:z-20 tw:mt-4 tw:w-72 tw:rounded-md tw:border tw:border-neutral-200 tw:bg-white tw:p-2 tw:shadow-lg"
              >
                {enlacesMas.map((item) => (
                  <li key={item.label} role="none">
                    <Link
                      to={item.to}
                      role="menuitem"
                      onClick={() => setMenuMas(false)}
                      className="tw:flex tw:items-center tw:justify-between tw:gap-4 tw:rounded-sm tw:px-4 tw:py-3.5 tw:text-[15px] tw:font-medium tw:text-fondo-oscuro-secciones tw:hover:bg-neutral-50"
                    >
                      {item.label}
                      <ArrowUpRight className="tw:size-4 tw:shrink-0 tw:text-blue-600" aria-hidden="true" />
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
          className="tw:-mr-2 tw:cursor-pointer tw:p-2 tw:text-neutral-900 tw:md:hidden"
        >
          {menuMovil ? <X className="tw:size-6" aria-hidden="true" /> : <Menu className="tw:size-6" aria-hidden="true" />}
        </button>

        <div className="tw:hidden tw:items-center tw:gap-3 tw:md:flex">
          {!cargando &&
            (usuario ? (
              <div className="tw:relative tw:hidden tw:sm:block">
                <button
                  type="button"
                  aria-expanded={menuUsuario}
                  aria-label={`Menú de ${usuario.nombre}`}
                  onClick={() => setMenuUsuario((v) => !v)}
                  className={`${textoNav} tw:flex tw:cursor-pointer tw:items-center tw:gap-1 tw:whitespace-nowrap tw:hover:text-blue-600`}
                >
                  <User className="tw:hidden tw:size-5 tw:md:max-lg:block" aria-hidden="true" />
                  <span className="tw:md:max-lg:hidden">Hola, {usuario.nombre.split(' ')[0]}</span>
                  <ChevronDown className="tw:size-4" aria-hidden="true" />
                </button>

                {menuUsuario && (
                  <ul className="tw:absolute tw:right-0 tw:top-full tw:z-10 tw:mt-3 tw:w-44 tw:rounded-md tw:border tw:border-neutral-200 tw:bg-white tw:py-1 tw:text-sm tw:shadow-md">
                    <li>
                      <Link
                        to="/mis-cursos"
                        onClick={() => setMenuUsuario(false)}
                        className="tw:block tw:px-4 tw:py-2 tw:text-neutral-800 tw:hover:bg-neutral-50"
                      >
                        Mis cursos
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuUsuario(false)
                          logout().catch(() => {})
                        }}
                        className="tw:block tw:w-full tw:cursor-pointer tw:px-4 tw:py-2 tw:text-left tw:text-neutral-800 tw:hover:bg-neutral-50"
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
                className={`${textoNav} tw:hidden tw:items-center tw:whitespace-nowrap tw:hover:text-blue-600 tw:sm:inline-flex`}
              >
                <User className="tw:hidden tw:size-5 tw:md:max-lg:block" aria-hidden="true" />
                <span className="tw:md:max-lg:hidden">Iniciar sesión</span>
              </Link>
            ))}
          <Link
            to="/registro"
            className="tw:rounded-sm tw:border tw:border-neutral-300 tw:px-4 tw:py-3 tw:text-[13px] tw:font-bold tw:uppercase tw:tracking-wider tw:text-fondo-oscuro-secciones tw:hover:bg-neutral-50"
          >
            Inscribirme
          </Link>
          <a href="/contacto" className={botonContacto}>
            <span className="tw:size-1.5 tw:rounded-full tw:bg-white" aria-hidden="true" />
            Contacto
          </a>
        </div>
      </nav>

      {menuMovil && (
        <div
          id="menu-movil"
          onClick={(e) => e.target.closest('a') && setMenuMovil(false)}
          className="tw:border-t tw:border-neutral-200 tw:px-6 tw:pb-6 tw:pt-2 tw:md:hidden"
        >
          <ul className="tw:divide-y tw:divide-neutral-100 tw:text-neutral-800">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`${textoNav} tw:block tw:py-3`}>
                  {link.label}
                </a>
              </li>
            ))}
            {enlacesMas.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={`${textoNav} tw:flex tw:items-center tw:justify-between tw:py-3`}>
                  {item.label}
                  <ArrowUpRight className="tw:size-4 tw:text-blue-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
            {!cargando && (
              <li className="tw:py-3">
                {usuario ? (
                  <>
                    <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-widest tw:text-slate-500">
                      Hola, {usuario.nombre.split(' ')[0]}
                    </p>
                    <Link to="/mis-cursos" className="tw:block tw:py-2 tw:pl-3">
                      Mis cursos
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuMovil(false)
                        logout().catch(() => {})
                      }}
                      className="tw:block tw:w-full tw:cursor-pointer tw:py-2 tw:pl-3 tw:text-left"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link to="/login" className={`${textoNav} tw:block tw:py-2`}>
                    Iniciar sesión
                  </Link>
                )}
              </li>
            )}
          </ul>

          <div className="tw:mt-3 tw:flex tw:gap-3">
            <Link
              to="/registro"
              className="tw:flex-1 tw:rounded-sm tw:border tw:border-neutral-300 tw:px-4 tw:py-3 tw:text-center tw:text-[13px] tw:font-bold tw:uppercase tw:tracking-wider tw:text-fondo-oscuro-secciones"
            >
              Inscribirme
            </Link>
            <a href="/contacto" className={`${botonContacto} tw:flex-1`}>
              <span className="tw:size-1.5 tw:rounded-full tw:bg-white" aria-hidden="true" />
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
