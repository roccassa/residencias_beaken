import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../../api/client'
import FormularioActividad from '../../components/admin/FormularioActividad'
import EstadoCarga from '../../components/EstadoCarga'
import { useTitulo } from '../../hooks/useTitulo'

// Crear (/admin/actividades/nueva) o editar (/admin/actividades/:id) una actividad.
// El formulario necesita las listas de categorías, ubicaciones e instructores.
export default function ActividadAdminPage() {
  const { id } = useParams()
  const [estado, setEstado] = useState({ datos: null, error: null })
  useTitulo(`${id ? 'Editar' : 'Nueva'} actividad · Administración`)

  useEffect(() => {
    let cancelado = false

    Promise.all([apiGet('/admin/catalogos'), id ? apiGet(`/admin/actividades/${id}`) : null])
      .then(([catalogos, actividad]) => !cancelado && setEstado({ datos: { catalogos, actividad }, error: null }))
      .catch((error) => !cancelado && setEstado({ datos: null, error }))

    return () => {
      cancelado = true
    }
  }, [id])

  if (!estado.datos) return <EstadoCarga cargando={!estado.error} error={estado.error} />

  return (
    <FormularioActividad
      key={id ?? 'nueva'}
      actividad={estado.datos.actividad}
      catalogos={estado.datos.catalogos}
    />
  )
}
