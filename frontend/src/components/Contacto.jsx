import SectionHeading from './SectionHeading'
import './Contacto.css'
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
    <section id="contacto" className="contacto">
      <SectionHeading
        variant={variant}
        align="center"
        label="Contacto"
        title="Hablemos"
        description="Escríbenos por WhatsApp, Instagram, Facebook o Telegram. Respondemos rápido y sin rodeos."
      />

      <div className="contacto__canales">
        {canales.map((canal) => (
          <div key={canal.titulo} className="contacto__canal">
            <img src={canal.icon} alt="" className="contacto__icono" />
            <h3 className="contacto__titulo contacto__titulo--con-icono">
              {canal.titulo}
            </h3>
            <p className="contacto__texto">
              {canal.descripcion}
            </p>
            <a href={canal.href} className="contacto__enlace">
              {canal.valor}
            </a>
          </div>
        ))}

        <div className="contacto__canal">
          <img src={iconFollow} alt="" className="contacto__icono-redes" />
          <h3 className="contacto__titulo">
            Redes sociales
          </h3>
          <p className="contacto__texto">
            Siguenos en tu red social favorita
          </p>
          <div className="contacto__redes">
            {redes.map((red) => {
              const externo = red.href.startsWith('http')
              return (
                <a
                  key={red.nombre}
                  href={red.href}
                  aria-label={red.nombre}
                  {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="contacto__red"
                >
                  <img src={red.icon} alt="" className="contacto__red-icono" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
