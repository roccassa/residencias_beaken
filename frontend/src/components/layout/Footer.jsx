import logotipo from '../../assets/images/logotipo-transparente.png'

const unidades = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
  { label: 'Networking', href: '#' },
]

const ecosistema = [
  { label: 'Origo Beaken', href: '#' },
  { label: 'Aliados', href: '#' },
  { label: 'Mentores', href: '#' },
  { label: 'Contacto', href: '#contacto' },
]

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-slate-400">
        {title}
      </h3>
      <ul className="tw:mt-4 tw:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="tw:text-white tw:hover:text-slate-300">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="tw:relative tw:overflow-hidden tw:border-t-4 tw:border-rose-500 tw:bg-[#0f1b2e] tw:text-white">
      <span
        aria-hidden="true"
        className="tw:pointer-events-none tw:absolute tw:left-4 tw:top-1/3 tw:select-none tw:whitespace-nowrap tw:text-[9rem] tw:font-black tw:leading-none tw:tracking-tight tw:text-white/[0.04] tw:sm:text-[13rem]"
      >
        BEAKEN
      </span>

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-16">
        <div className="tw:grid tw:gap-12 tw:md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="tw:inline-block">
              <img
                src={logotipo}
                alt="Beaken"
                className="tw:h-8 tw:w-auto tw:brightness-0 tw:invert"
              />
            </a>
            <p className="tw:mt-4 tw:max-w-xs tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-slate-400">
              Inteligencia de negocios aplicada · Diagnóstico · Ejecución ·
              Adopción
            </p>
            <div className="tw:mt-6 tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-slate-600 tw:px-3 tw:py-1.5 tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-slate-300">
              <span className="tw:size-1.5 tw:rounded-full tw:bg-rose-500" />
              Agendando Q2 2026
            </div>
          </div>

          <FooterColumn title="Unidades" links={unidades} />
          <FooterColumn title="Ecosistema" links={ecosistema} />

          <div>
            <h3 className="tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-slate-400">
              Base
            </h3>
            <ul className="tw:mt-4 tw:space-y-3">
              <li>
                <a
                  href="mailto:hola@beaken.mx"
                  className="tw:text-white tw:hover:text-slate-300"
                >
                  hola@beaken.mx
                </a>
              </li>
              <li className="tw:font-semibold tw:text-white">León, Guanajuato</li>
              <li className="tw:text-slate-400">Operación remota LATAM</li>
              <li>
                <a href="#" className="tw:text-white tw:hover:text-slate-300">
                  Aviso de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="tw:mt-27 tw:flex tw:flex-col-reverse tw:items-center tw:justify-between tw:gap-3 tw:border-t tw:border-white/10 tw:pt-6 tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-slate-500 tw:sm:flex-row">
          <p>© 2026 Beaken · Inteligencia de negocios aplicada</p>
          <p>v.26.04 · beaken.agency</p>
        </div>
      </div>
    </footer>
  )
}
