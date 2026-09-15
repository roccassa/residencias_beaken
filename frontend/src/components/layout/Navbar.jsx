import logotipo from '../../assets/images/logotipo.png'

const links = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
]

export default function Navbar() {
  return (
    <header className="tw:border-b tw:border-neutral-200">
      <nav className="tw:mx-auto tw:flex tw:max-w-6xl tw:items-center tw:justify-between tw:px-6 tw:py-6">
        <a href="/">
          <img src={logotipo} alt="Beaken" className="tw:h-8 tw:w-auto" />
        </a>

        <ul className="tw:hidden tw:items-center tw:gap-8 tw:text-sm tw:font-medium tw:text-neutral-800 tw:md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="tw:hover:text-neutral-500">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="tw:flex tw:items-center tw:gap-1 tw:hover:text-neutral-500"
            >
              Eventos
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
          </li>
        </ul>

        <div className="tw:flex tw:items-center tw:gap-3">
          <a
            href="/registro"
            className="tw:rounded-md tw:border tw:border-neutral-300 tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-neutral-900 tw:hover:bg-neutral-50"
          >
            Registro
          </a>
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
