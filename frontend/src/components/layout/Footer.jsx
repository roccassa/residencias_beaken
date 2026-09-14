const columns = [
  {
    title: 'Explora',
    links: ['Cursos', 'Talleres', 'Eventos', 'Registro', 'Inicio'],
  },
  {
    title: 'Conecta',
    links: ['WhatsApp', 'Instagram', 'Facebook', 'Contacto', 'Preguntas'],
  },
  {
    title: 'Síguenos',
    links: ['Facebook', 'Instagram', 'X', 'LinkedIn', 'Youtube'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <a href="/" className="font-serif text-xl italic">
            Logo
          </a>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                  {col.title}
                </h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-neutral-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-500 sm:flex-row">
          <p>© 2026 Catálogo de Cursos y Eventos. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-900">
              Privacidad
            </a>
            <a href="#" className="hover:text-neutral-900">
              Términos de servicio
            </a>
            <a href="#" className="hover:text-neutral-900">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
