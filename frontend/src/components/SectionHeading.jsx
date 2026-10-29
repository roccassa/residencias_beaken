import './SectionHeading.css'

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  variant = 'dot',
}) {
  const centered = align === 'center'
  const dot = variant === 'dot'

  const clases = ['encabezado-seccion']
  if (!dot) clases.push('encabezado-seccion--linea')
  if (centered) clases.push('encabezado-seccion--centrado')

  return (
    <div className={clases.join(' ')} data-aparece>
      <div className="encabezado-seccion__marca">
        <span className={dot ? 'encabezado-seccion__punto' : 'encabezado-seccion__linea'} />
        <p className="encabezado-seccion__etiqueta">{label}</p>
      </div>

      <h2 className="encabezado-seccion__titulo">{title}</h2>

      {description && <p className="encabezado-seccion__descripcion">{description}</p>}
    </div>
  )
}
