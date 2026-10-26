import TablaUsuarios from '../../components/admin/TablaUsuarios'
import { useTitulo } from '../../hooks/useTitulo'

export default function UsuariosAdminPage() {
  useTitulo('Usuarios · Administración')

  return <TablaUsuarios />
}
