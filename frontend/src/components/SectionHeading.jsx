export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  variant = 'dot',
}) {
  const centered = align === 'center'
  const dot = variant === 'dot'

  return (
    <div className={centered ? 'tw:text-center' : ''}>
      <div
        className={`tw:inline-flex tw:items-center tw:gap-2 ${
          dot ? '' : 'tw:flex-col tw:items-start tw:gap-2'
        } ${centered && !dot ? 'tw:items-center' : ''}`}
      >
        {dot ? (
          <span className="tw:size-1.5 tw:shrink-0 tw:rounded-full tw:bg-rose-500" />
        ) : (
          <span className="tw:h-0.5 tw:w-10 tw:bg-blue-600" />
        )}
        <p
          className={`tw:text-xs tw:uppercase tw:tracking-widest ${
            dot ? 'tw:font-semibold tw:text-slate-500' : 'tw:font-mono tw:text-blue-600'
          }`}
        >
          {label}
        </p>
      </div>

      <h2
        className={
          dot
            ? 'tw:mt-3 tw:font-display tw:text-4xl tw:font-semibold tw:leading-tight tw:tracking-tight tw:text-fondo-oscuro-secciones tw:md:text-[52px]'
            : 'tw:mt-3 tw:text-3xl tw:font-extrabold tw:tracking-tight tw:text-neutral-950 tw:md:text-4xl'
        }
      >
        {title}
      </h2>

      {description && (
        <p
          className={`tw:mt-3 tw:max-w-xl tw:text-neutral-600 ${
            centered ? 'tw:mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
