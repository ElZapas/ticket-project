import { Link, Outlet} from 'react-router-dom';
import '../App.css'
import { useAuth } from '../hooks/useAuth';

export default function Layout() {
  const {logout} = useAuth()
  return (
    <>
    <nav>
    <Link to="/home">home</Link>
    <button onClick={logout}>cerrar sesion</button>
    </nav>
    <Outlet />
    </>
  )
}
