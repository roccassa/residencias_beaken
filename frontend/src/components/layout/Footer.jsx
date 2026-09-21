import logotipo from '../../assets/images/logotipo-transparente.png'

const unidades = [
  { label: 'Agency', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Academy', href: '#' },
  { label: 'Network', href: '#' },
  { label: 'Eventos', href: '#' },
]

const ecosistema = [
  { label: 'Comunidad', href: '#', external: true },
  { label: 'Plataforma de clientes', href: '#' },
  { label: 'Colabora con Beaken', href: '#' },
  { label: 'Administración', href: '#' },
]

const columnTitle =
  'tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-[#7fa6c7]'
const linkClass = 'tw:text-[#e8eff7] tw:hover:text-[#8fc3ea]'

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className={columnTitle}>{title}</h3>
      <ul className="tw:mt-5 tw:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={linkClass}>
              {link.label}
              {link.external && (
                <span aria-hidden="true" className="tw:ml-1 tw:text-xs">
                  ↗
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="tw:relative tw:overflow-hidden tw:border-t-4 tw:border-rose-500 tw:bg-[#102a43] tw:text-white">
      <span
        aria-hidden="true"
        className="tw:pointer-events-none tw:absolute tw:bottom-[3.4rem] tw:sm:bottom-[3.2rem] tw:lg:bottom-[2.9rem] tw:right-[5%] tw:select-none tw:whitespace-nowrap tw:text-[7rem] tw:font-black tw:leading-none tw:tracking-tight tw:text-white/[0.06] tw:sm:text-[10rem] tw:lg:text-[14rem]"
      >
        BEAKEN
      </span>

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6 tw:pt-16">
        <div className="tw:grid tw:gap-12 tw:sm:grid-cols-3 tw:lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
          <div className="tw:sm:col-span-3 tw:lg:col-span-1">
            <a href="/" className="tw:inline-block">
              <img
                src={logotipo}
                alt="Beaken"
                className="tw:-ml-[7px] tw:h-10 tw:w-auto tw:brightness-0 tw:invert"
              />
            </a>
            <p className="tw:mt-8 tw:leading-relaxed tw:text-[#c5d5e4]">
              Primero entendemos.
              <br />
              Después diseñamos.
            </p>
            <a
              href="#"
              className="tw:mt-7 tw:inline-flex tw:items-center tw:gap-5 tw:border tw:border-[#3a5673] tw:px-5 tw:py-3.5 tw:font-mono tw:text-[11px] tw:uppercase tw:tracking-widest tw:text-[#e8eff7] tw:hover:border-[#8fc3ea]"
            >
              <span className="tw:size-1 tw:rounded-full tw:bg-rose-500" />
              Conversemos
              <span aria-hidden="true" className="tw:ml-2 tw:text-sm tw:text-pink-500">
                ↗
              </span>
            </a>
          </div>

          <FooterColumn title="Unidades" links={unidades} />
          <FooterColumn title="Ecosistema" links={ecosistema} />

          <div>
            <h3 className={columnTitle}>Hablemos</h3>
            <ul className="tw:mt-5 tw:space-y-4">
              <li>
                <a
                  href="mailto:hola@beaken.mx"
                  className="tw:text-sm tw:text-[#d5e2ee] tw:hover:text-[#8fc3ea]"
                >
                  hola@beaken.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+524777606059"
                  className="tw:text-xl tw:font-semibold tw:text-white tw:hover:text-[#8fc3ea]"
                >
                  477 760 6059
                </a>
              </li>
              <li className="tw:text-[13px] tw:text-[#a8bdd0]">
                León, Guanajuato · México
              </li>
              <li className="tw:pt-2">
                <a href="#" className={`tw:text-[15px] ${linkClass}`}>
                  Aviso de privacidad
                </a>
              </li>
              <li>
                <a href="#" className={`tw:text-[15px] ${linkClass}`}>
                  Derechos ARCO
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="tw:mt-27 tw:flex tw:flex-col tw:gap-3 tw:border-t tw:border-white/20 tw:pb-6 tw:pt-6 tw:font-mono tw:text-[11px] tw:uppercase tw:tracking-widest tw:sm:flex-row tw:sm:justify-between">
          <p className="tw:text-[#7f9bb5]">© 2026 Beaken</p>
          <a href="#" className="tw:text-[#8fc3ea] tw:hover:text-white">
            Hagamos que suceda <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
