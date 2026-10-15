import logotipo from '../../assets/images/logotipo-transparente.png'
import './Footer.css'

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

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="pie__columna-titulo">{title}</h3>
      <ul className="pie__lista">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="pie__enlace">
              {link.label}
              {link.external && (
                <span aria-hidden="true" className="pie__enlace-externo">
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
    <footer className="pie">
      <span aria-hidden="true" className="pie__marca-agua">
        BEAKEN
      </span>

      <div className="pie__contenedor">
        <div className="pie__rejilla">
          <div className="pie__bloque-marca">
            <a href="/" className="pie__logo-enlace">
              <img src={logotipo} alt="Beaken" className="pie__logotipo" />
            </a>
            <p className="pie__eslogan">
              Primero entendemos.
              <br />
              Después diseñamos.
            </p>
            <a href="#" className="pie__boton">
              <span className="pie__boton-punto" />
              Conversemos
              <span aria-hidden="true" className="pie__boton-flecha">
                ↗
              </span>
            </a>
          </div>

          <FooterColumn title="Unidades" links={unidades} />
          <FooterColumn title="Ecosistema" links={ecosistema} />

          <div>
            <h3 className="pie__columna-titulo">Hablemos</h3>
            <ul className="pie__lista pie__lista--amplia">
              <li>
                <a href="mailto:hola@beaken.mx" className="pie__correo">
                  hola@beaken.mx
                </a>
              </li>
              <li>
                <a href="tel:+524777606059" className="pie__telefono">
                  477 760 6059
                </a>
              </li>
              <li className="pie__ubicacion">León, Guanajuato · México</li>
              <li className="pie__legal">
                <a href="#" className="pie__enlace pie__enlace--legal">
                  Aviso de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="pie__enlace pie__enlace--legal">
                  Derechos ARCO
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pie__base">
          <p className="pie__copyright">© 2026 Beaken</p>
          <a href="#" className="pie__lema">
            Hagamos que suceda <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
