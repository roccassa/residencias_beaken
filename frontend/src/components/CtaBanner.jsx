import tuLugarImg from '../assets/images/tu_lugar_espera.jpg'
import './CtaBanner.css'

export default function CtaBanner({
  description = 'Explora el catálogo completo o escríbenos por WhatsApp para una asesoría personalizada sin compromiso.',
  primaryLabel = 'Registrarme ahora',
}) {
  return (
    <section className="cta">
      <div className="cta__caja">
        <div className="cta__contenido">
          <div>
            <div className="cta__marca">
              <span className="cta__punto" />
              <p className="cta__etiqueta">
                Únete
              </p>
            </div>
            <h2 className="cta__titulo">
              Tu lugar te espera
            </h2>
          </div>
          <p className="cta__descripcion">{description}</p>
          <div className="cta__acciones">
            <a
              href="/registro"
              className="boton"
            >
              {primaryLabel}
            </a>

          </div>
          </div>
            <img
              src={tuLugarImg}  
              alt=""
              className="cta__imagen"
            />
          </div>
    </section>
  )
}
