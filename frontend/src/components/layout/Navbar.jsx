const links = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
]

export default function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-serif text-xl italic">
          Logo
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-neutral-800 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:text-neutral-500">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex items-center gap-1 hover:text-neutral-500"
            >
              Eventos
              <svg
                className="size-4"
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

        <div className="flex items-center gap-3">
          <a
            href="/registro"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Registro
          </a>
          <a
            href="/contacto"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Contacto
          </a>
        </div>
      </nav>
    </header>
  )
}
