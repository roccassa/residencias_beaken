import { useEffect, useState } from 'react'
import { apiGet } from '../api/client'

export function useFetch(path) {
  const [estado, setEstado] = useState({ data: null, cargando: true, error: null })

  useEffect(() => {
    let cancelado = false
    setEstado({ data: null, cargando: true, error: null })

    apiGet(path)
      .then((data) => !cancelado && setEstado({ data, cargando: false, error: null }))
      .catch((error) => !cancelado && setEstado({ data: null, cargando: false, error }))

    return () => {
      cancelado = true
    }
  }, [path])

  return estado
}
