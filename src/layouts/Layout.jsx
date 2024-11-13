import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../App.css';
import './Layout.css'; // Asegúrate de tener los estilos, gracias.
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../contexts/useApp';
import { useState } from 'react';

export default function Layout() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
    setUser(undefined);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="App">
        {/* Navbar con ícono de menú */}
        <nav className="navbar">
          <div className="menu-icon" onClick={toggleSidebar}>
            {isOpen ? <p> ☰ </p> : <p> ☰ </p>}
            <div>
              <img src="/img/millev.png" alt="Logo" />
            </div>
          </div>

          <div className="usuario-info">
            {user ? (
              <p className="navbar-title">Usuario: {user.nombreUsuario}</p>
            ) : (
              <p>Usuario no registrado</p>
            )}
            {!!user && (
              <button className="boton-cerrar-sesion" onClick={onLogout}>
                cerrar sesion
              </button>
            )}
          </div>
        </nav>

        {/* Sidebar */}
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <a href="#" onClick={toggleSidebar} className="close-btn">
            X
          </a>

          {/* Condicional para mostrar el enlace de Técnicos */}
          {user?.puesto !== 'tecnico' && (
            <Link to="/admin/list-tecnicos">Técnicos</Link>
          )}
          <Link to="/admin/list-ticket">Tickets</Link>
        </div>

        {/* Contenido Principal */}
        <div className={`content ${isOpen ? 'shrink' : ''}`}></div>
      </div>
      <Outlet />
    </>
  );
}
// Recomiendacion: No hagas redirecciones dentro de un hook personalizado