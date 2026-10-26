import TablaActividades from '../../components/admin/TablaActividades'
import { useTitulo } from '../../hooks/useTitulo'

export default function ActividadesAdminPage() {
  useTitulo('Actividades · Administración')

  return <TablaActividades />
}
