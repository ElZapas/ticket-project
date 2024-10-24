import { Link, Outlet, useNavigate} from 'react-router-dom';
import '../App.css'
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../contexts/useApp';

export default function Layout() {
  const {user, setUser} = useApp()
  const navigate = useNavigate();
  const {logout} = useAuth() // 1. importar todos los hooks al logout
  const onLogout = () => {
    // 2. funciones logicas
    logout()
    setUser(undefined)
    navigate('/')
  }
  return (
    <>
    <nav>
    <Link to="/home">home</Link>
    {!!user && <button onClick={onLogout}>cerrar sesion</button>}
    </nav>
    <Outlet />
    </>
  )
}
// Recomiendacion: No hagas redirecciones dentro de un hook personalizado