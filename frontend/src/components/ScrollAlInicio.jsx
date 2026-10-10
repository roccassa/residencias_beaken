import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de página, el navegador conserva la posición de scroll de la anterior.
// Aquí se sube al inicio, salvo que la dirección traiga un ancla (#cursos), en cuyo
// caso se baja a esa sección.
export default function ScrollAlInicio() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
