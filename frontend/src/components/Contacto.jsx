import SectionHeading from './SectionHeading'
import iconEmail from '../assets/images/icons/mail.png'
import iconWhatsapp from '../assets/images/icons/wap.webp'
import iconTelegram from '../assets/images/icons/telegram.svg'
import iconFacebook from '../assets/images/icons/facebook.webp'
import iconInstagram from '../assets/images/icons/instagram.png'
import iconFollow from '../assets/images/icons/follow.png'

const canales = [
  {
    titulo: 'Email',
    descripcion: 'Escríbenos sin compromiso',
    valor: 'hola@beaken.mx',
    href: 'mailto:hola@beaken.mx',
    icon: iconEmail,
  },
  {
    titulo: 'Teléfono',
    descripcion: 'Llámanos o envía WhatsApp',
    valor: '477 760 6059',
    href: 'https://wa.me/524777606059',
    icon: iconWhatsapp,
  },
  {
    titulo: 'Telegram',
    descripcion: 'Escribenos',
    valor: '@Soportebeakenbot',
    href: 'https://t.me/Soportebeakenbot',
    icon: iconTelegram,
  },
]

const redes = [
  {
    nombre: 'Facebook',
    href: 'https://www.facebook.com/beaken.mx/',
    icon: iconFacebook,
  },
  {
    nombre: 'Instagram',
    href: 'https://www.instagram.com/beaken.mx/',
    icon: iconInstagram,
  },
]

export default function Contacto({ variant }) {
  return (
    <section id="contacto" className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20 tw:text-center">
      <SectionHeading
        variant={variant}
        align="center"
        label="Contacto"
        title="Hablemos"
        description="Escríbenos por WhatsApp, Instagram, Facebook o Telegram. Respondemos rápido y sin rodeos."
      />

      <div className="tw:mt-12 tw:grid tw:gap-10 tw:sm:grid-cols-4">
        {canales.map((canal) => (
          <div key={canal.titulo} className="tw:flex tw:flex-col tw:items-center">
            <img src={canal.icon} alt="" className="tw:size-9 tw:object-contain" />
            <h3 className="tw:mt-4 tw:text-lg tw:font-semibold tw:text-neutral-900">
              {canal.titulo}
            </h3>
            <p className="tw:mt-2 tw:max-w-xs tw:text-sm tw:text-neutral-600">
              {canal.descripcion}
            </p>
            <a href={canal.href} className="tw:mt-2 tw:text-sm tw:font-medium tw:text-neutral-900 tw:underline tw:underline-offset-4">
              {canal.valor}
            </a>
          </div>
        ))}

        <div className="tw:flex tw:flex-col tw:items-center">
          <img src={iconFollow} alt="" className="tw:w-25 tw:h-auto tw:mb-2 tw:mt-3 tw:object-contain" />
          <h3 className="tw:text-lg tw:font-semibold tw:text-neutral-900">
            Redes sociales
          </h3>
          <p className="tw:mt-2 tw:max-w-xs tw:text-sm tw:text-neutral-600">
            Siguenos en tu red social favorita
          </p>
          <div className="tw:mt-3 tw:flex tw:gap-3">
            {redes.map((red) => {
              const externo = red.href.startsWith('http')
              return (
                <a
                  key={red.nombre}
                  href={red.href}
                  aria-label={red.nombre}
                  {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="tw:flex tw:size-9 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-neutral-300 tw:hover:bg-neutral-100"
                >
                  <img src={red.icon} alt="" className="tw:size-5 tw:object-contain" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
