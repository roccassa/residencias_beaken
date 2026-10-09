import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, User, X } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import logotipo from '../../assets/images/logotipo.png'

const links = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
]

const networkingLinks = [
  { label: 'Cursos', to: '/cursos' },
  { label: 'Talleres', to: '/talleres' },
  { label: 'Eventos', to: '/eventos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuUsuario, setMenuUsuario] = useState(false)
  const [menuMovil, setMenuMovil] = useState(false)
  const { usuario, cargando, logout } = useAuth()

  useEffect(() => {
    if (!menuMovil) return
    const cerrarConEscape = (e) => e.key === 'Escape' && setMenuMovil(false)
    document.addEventListener('keydown', cerrarConEscape)
    return () => document.removeEventListener('keydown', cerrarConEscape)
  }, [menuMovil])

  return (
    <header className="tw:border-b tw:border-neutral-200">
      <nav className="tw:mx-auto tw:flex tw:max-w-6xl tw:items-center tw:justify-between tw:px-6 tw:py-6">
        <Link to="/">
          <img src={logotipo} alt="Beaken" className="tw:h-8 tw:w-auto" />
        </Link>

        <ul className="tw:hidden tw:items-center tw:gap-5 tw:text-sm tw:font-medium tw:text-neutral-800 tw:md:flex tw:lg:gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="tw:hover:text-neutral-500">
                {link.label}
              </a>
            </li>
          ))}
          <li className="tw:relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="tw:flex tw:items-center tw:gap-1 tw:hover:text-neutral-500"
            >
              Comunidad
              <svg
                className="tw:size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <ul className="tw:absolute tw:left-0 tw:top-full tw:z-10 tw:mt-2 tw:w-40 tw:rounded-md tw:border tw:border-neutral-200 tw:bg-white tw:py-1 tw:shadow-md">
                {networkingLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="tw:block tw:px-4 tw:py-2 tw:text-neutral-800 tw:hover:bg-neutral-50"
                    >
                      {item.label}
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
              <div className="tw:relative tw:hidden tw:text-sm tw:sm:block">
                <button
                  type="button"
                  aria-expanded={menuUsuario}
                  aria-label={`Menú de ${usuario.nombre}`}
                  onClick={() => setMenuUsuario((v) => !v)}
                  className="tw:flex tw:cursor-pointer tw:items-center tw:gap-1 tw:whitespace-nowrap tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500"
                >
                  <User className="tw:hidden tw:size-5 tw:md:max-lg:block" aria-hidden="true" />
                  <span className="tw:md:max-lg:hidden">Hola, {usuario.nombre.split(' ')[0]}</span>
                  <svg
                    className="tw:size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {menuUsuario && (
                  <ul className="tw:absolute tw:right-0 tw:top-full tw:z-10 tw:mt-2 tw:w-44 tw:rounded-md tw:border tw:border-neutral-200 tw:bg-white tw:py-1 tw:shadow-md">
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
                className="tw:hidden tw:items-center tw:whitespace-nowrap tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500 tw:sm:inline-flex"
              >
                <User className="tw:hidden tw:size-5 tw:md:max-lg:block" aria-hidden="true" />
                <span className="tw:md:max-lg:hidden">Iniciar sesión</span>
              </Link>
            ))}
          <Link
            to="/registro"
            className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50"
          >
            Registro
          </Link>
          <a
            href="/contacto"
            className="tw:rounded-md tw:bg-neutral-900 tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-white tw:hover:bg-neutral-700"
          >
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
                <a href={link.href} className="tw:block tw:py-3 tw:font-medium">
                  {link.label}
                </a>
              </li>
            ))}
            <li className="tw:py-3">
              <p className="tw:text-xs tw:font-semibold tw:uppercase tw:tracking-widest tw:text-slate-500">
                Comunidad
              </p>
              <ul className="tw:mt-1">
                {networkingLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="tw:block tw:py-2 tw:pl-3">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
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
                  <Link to="/login" className="tw:block tw:py-2 tw:font-medium">
                    Iniciar sesión
                  </Link>
                )}
              </li>
            )}
          </ul>

          <div className="tw:mt-3 tw:flex tw:gap-3">
            <Link
              to="/registro"
              className="tw:flex-1 tw:rounded-md tw:border tw:border-neutral-300 tw:px-4 tw:py-2.5 tw:text-center tw:text-sm tw:font-medium tw:text-neutral-900"
            >
              Registro
            </Link>
            <a
              href="/contacto"
              className="tw:flex-1 tw:rounded-md tw:bg-neutral-900 tw:px-4 tw:py-2.5 tw:text-center tw:text-sm tw:font-medium tw:text-white"
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
