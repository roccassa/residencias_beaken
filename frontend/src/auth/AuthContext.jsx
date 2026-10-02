import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    apiGet('/auth/me')
      .then((respuesta) => setUsuario(respuesta.usuario))
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false))
  }, [])

  const login = useCallback(async (datos) => {
    const respuesta = await apiPost('/auth/login', datos)
    setUsuario(respuesta.usuario)
  }, [])

  const registrar = useCallback(async (datos) => {
    const respuesta = await apiPost('/auth/registro', datos)
    setUsuario(respuesta.usuario)
  }, [])

  const logout = useCallback(async () => {
    await apiPost('/auth/logout', {})
    setUsuario(null)
  }, [])

  const valor = useMemo(
    () => ({ usuario, cargando, login, registrar, logout }),
    [usuario, cargando, login, registrar, logout],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return contexto
}
