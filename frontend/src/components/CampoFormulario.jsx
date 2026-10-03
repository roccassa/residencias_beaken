export const inputClass =
  'tw:w-full tw:rounded-md tw:border tw:border-neutral-300 tw:bg-white tw:px-3 tw:py-2.5 tw:text-sm tw:text-neutral-900 tw:placeholder:text-neutral-400 tw:focus:border-blue-600 tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-blue-600'

export default function CampoFormulario({ label, htmlFor, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="tw:mb-1.5 tw:block tw:text-sm tw:font-medium tw:text-neutral-800">
        {label}
        {required && <span className="tw:text-rose-500"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="tw:mt-1 tw:text-xs tw:text-rose-600">{error}</p>
      ) : (
        hint && <p className="tw:mt-1 tw:text-xs tw:text-neutral-500">{hint}</p>
      )}
    </div>
  )
}
