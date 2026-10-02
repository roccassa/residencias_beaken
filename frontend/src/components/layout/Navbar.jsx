import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  const { usuario, cargando, logout } = useAuth()

  return (
    <header className="tw:border-b tw:border-neutral-200">
      <nav className="tw:mx-auto tw:flex tw:max-w-6xl tw:items-center tw:justify-between tw:px-6 tw:py-6">
        <Link to="/">
          <img src={logotipo} alt="Beaken" className="tw:h-8 tw:w-auto" />
        </Link>

        <ul className="tw:hidden tw:items-center tw:gap-8 tw:text-sm tw:font-medium tw:text-neutral-800 tw:md:flex">
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

        <div className="tw:flex tw:items-center tw:gap-3">
          {!cargando &&
            (usuario ? (
              <div className="tw:hidden tw:items-center tw:gap-3 tw:text-sm tw:sm:flex">
                <span className="tw:text-neutral-600">Hola, {usuario.nombre.split(' ')[0]}</span>
                <button
                  type="button"
                  onClick={() => logout().catch(() => {})}
                  className="tw:cursor-pointer tw:font-medium tw:text-neutral-900 tw:underline tw:underline-offset-4 tw:hover:text-neutral-500"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="tw:hidden tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:text-neutral-500 tw:sm:inline"
              >
                Iniciar sesión
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
    </header>
  )
}
