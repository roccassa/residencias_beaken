import { useEffect } from 'react'

const TITULO_BASE = 'Beaken | Cursos, talleres y eventos'

// Título de la pestaña: "Sección | Beaken"; sin sección, el título general del sitio.
export function useTitulo(seccion) {
  useEffect(() => {
    document.title = seccion ? `${seccion} | Beaken` : TITULO_BASE
  }, [seccion])
}
