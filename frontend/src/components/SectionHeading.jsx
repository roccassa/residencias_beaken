export default function SectionHeading({ label, title, description, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'tw:text-center' : ''}>
      <div
        className={`tw:inline-flex tw:flex-col tw:gap-2 ${
          centered ? 'tw:items-center' : 'tw:items-start'
        }`}
      >
        <span className="tw:h-0.5 tw:w-10 tw:bg-blue-600" />
        <p className="tw:font-mono tw:text-xs tw:uppercase tw:tracking-widest tw:text-blue-600">
          {label}
        </p>
      </div>

      <h2 className="tw:mt-3 tw:text-3xl tw:font-extrabold tw:tracking-tight tw:text-neutral-950 tw:md:text-4xl">
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
