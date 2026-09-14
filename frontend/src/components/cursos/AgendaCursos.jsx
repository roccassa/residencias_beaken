import { useMemo, useState } from 'react'
import { categorias, cursos } from '../../data/cursos'
import CourseCard from './CourseCard'

export default function AgendaCursos() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)

  const cursosFiltrados = useMemo(() => {
    if (!categoriaActiva) return cursos
    return cursos.filter((curso) => curso.categoriaId === categoriaActiva)
  }, [categoriaActiva])

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold text-neutral-500">Tagline</p>
      <h2 className="mt-2 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
        Cursos disponibles
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Explora el catálogo completo y filtra por categoría para encontrar el
        curso que se ajusta a lo que buscas.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setCategoriaActiva(null)}
          className={`rounded-md border px-4 py-2 text-sm font-medium ${
            categoriaActiva === null
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300 text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          View all
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`px-2 py-2 text-sm font-medium ${
              categoriaActiva === categoria.id
                ? 'text-neutral-900 underline underline-offset-4'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {cursosFiltrados.map((curso) => (
          <CourseCard key={curso.id} curso={curso} />
        ))}

        {cursosFiltrados.length === 0 && (
          <p className="border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
            No hay cursos disponibles en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  )
}
