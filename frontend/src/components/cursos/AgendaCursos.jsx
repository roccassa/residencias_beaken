import { useMemo, useState } from 'react'
import { categorias, cursos } from '../../data/cursos'
import SectionHeading from '../SectionHeading'
import CourseCard from './CourseCard'

export default function AgendaCursos() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)

  const cursosFiltrados = useMemo(() => {
    if (!categoriaActiva) return cursos
    return cursos.filter((curso) => curso.categoriaId === categoriaActiva)
  }, [categoriaActiva])

  return (
    <section className="tw:mx-auto tw:max-w-6xl tw:px-6 tw:py-20">
      <SectionHeading
        label="Tagline"
        title="Cursos disponibles"
        description="Explora el catálogo completo y filtra por categoría para encontrar el curso que se ajusta a lo que buscas."
      />

      <div className="tw:mt-8 tw:flex tw:flex-wrap tw:items-center tw:gap-3">
        <button
          type="button"
          onClick={() => setCategoriaActiva(null)}
          className={`tw:rounded-md tw:border tw:px-4 tw:py-2 tw:text-sm tw:font-medium ${
            categoriaActiva === null
              ? 'tw:border-neutral-900 tw:bg-neutral-900 tw:text-white'
              : 'tw:border-neutral-300 tw:text-neutral-900 tw:hover:bg-neutral-50'
          }`}
        >
          Ver Todo
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`tw:px-2 tw:py-2 tw:text-sm tw:font-medium ${
              categoriaActiva === categoria.id
                ? 'tw:text-neutral-900 tw:underline tw:underline-offset-4'
                : 'tw:text-neutral-500 tw:hover:text-neutral-900'
            }`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className="tw:mt-8 tw:space-y-4">
        {cursosFiltrados.map((curso) => (
          <CourseCard key={curso.id} curso={curso} />
        ))}

        {cursosFiltrados.length === 0 && (
          <p className="tw:border tw:border-dashed tw:border-neutral-300 tw:p-8 tw:text-center tw:text-neutral-500">
            No hay cursos disponibles en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  )
}
