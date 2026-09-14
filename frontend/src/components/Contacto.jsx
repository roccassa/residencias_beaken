const canales = [
  {
    titulo: 'Email',
    descripcion: 'Escríbenos por WhatsApp y resolvemos',
    valor: 'hola@catalogo.com',
    href: 'mailto:hola@catalogo.com',
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: 'Teléfono',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    valor: '+34 555 000 000',
    href: 'tel:+34555000000',
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.3a16 16 0 0 0 6 6l1.5-1.4a2 2 0 0 1 2-.5c1 .4 2 .6 3.1.7a2 2 0 0 1 1.7 2.1Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: 'Oficina',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    valor: 'Calle Mayor 123, Madrid, España',
    href: '#',
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-7-5.7-7-11a7 7 0 1 1 14 0c0 5.3-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
]

export default function Contacto() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <p className="text-sm font-semibold text-neutral-500">Contacto</p>
      <h2 className="mt-2 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
        Hablemos
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-neutral-600">
        Escríbenos por WhatsApp, Instagram o Facebook. Respondemos rápido y
        sin rodeos.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {canales.map((canal) => (
          <div key={canal.titulo} className="flex flex-col items-center">
            <div className="text-neutral-700">{canal.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              {canal.titulo}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-neutral-600">
              {canal.descripcion}
            </p>
            <a href={canal.href} className="mt-2 text-sm font-medium text-neutral-900 underline underline-offset-4">
              {canal.valor}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
