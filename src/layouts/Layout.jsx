import { Link, Outlet } from 'react-router-dom';
import '../App.css'

export default function Layout() {
  return (
    <>
    <nav>
    <Link to="/login">Acceder</Link>
    <Link to="/register">Registrarse</Link>
    <Link to="/">Pagina principal</Link>
    </nav>
    <Outlet />
    </>
  )
}
