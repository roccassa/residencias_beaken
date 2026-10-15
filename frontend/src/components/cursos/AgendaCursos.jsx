import { useMemo, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import EstadoCarga from '../EstadoCarga'
import SectionHeading from '../SectionHeading'
import '../Agenda.css'
import CourseCard from './CourseCard'

export default function AgendaCursos() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const { data: cursos, cargando, error } = useFetch('/actividades?tipo=curso')
  const { data: categorias } = useFetch('/categorias?tipo=curso')

  const cursosFiltrados = useMemo(() => {
    if (!cursos) return []
    if (!categoriaActiva) return cursos
    return cursos.filter((curso) => curso.categoriaId === categoriaActiva)
  }, [cursos, categoriaActiva])

  return (
    <section className="agenda">
      <SectionHeading
        label="Tagline"
        title="Cursos disponibles"
        description="Explora el catálogo completo y filtra por categoría para encontrar el curso que se ajusta a lo que buscas."
      />

      <div className="agenda__filtros">
        <button
          type="button"
          onClick={() => setCategoriaActiva(null)}
          className={`boton boton--contorno boton--compacto${categoriaActiva === null ? ' boton--activo' : ''}`}
        >
          Ver Todo
        </button>
        {(categorias ?? []).map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`agenda__categoria${categoriaActiva === categoria.id ? ' agenda__categoria--activa' : ''}`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className="agenda__lista">
        <EstadoCarga cargando={cargando} error={error} />

        {cursosFiltrados.map((curso) => (
          <CourseCard key={curso.id} curso={curso} />
        ))}

        {!cargando && !error && cursosFiltrados.length === 0 && (
          <p className="agenda__vacio">
            No hay cursos disponibles en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  )
}
