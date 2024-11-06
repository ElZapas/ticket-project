import { useState } from 'react';
import '../views/css/Sidebar.css'; // Asegúrate de tener los estilos
import TablaTickets from './TablaTickets'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      {/* Navbar con ícono de menú */}
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleSidebar}>
          {isOpen ? <p> ☰ </p> :  <p> ☰ </p>}
        
          <div>
            <img src=".\src\assets\img\millev.png"/>
          </div>

        </div>
     
        <div className='usuario-info'>

            <p className="navbar-title">Usuario: Rodrigo Rojas</p>
            <button>Cerrar Sesión</button>
        </div>

      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
       
           
            <a href="#" onClick={toggleSidebar} className="close-btn"> X </a>
       
        <a href="#">Tecnicos</a>
        <a href="#">Tickets</a>
        
      </div>

      {/* Contenido Principal */}
      <div className={`content ${isOpen ? 'shrink' : ''}`}>
        
    <TablaTickets/>

      </div>
    </div>
  );
};

export default Sidebar;
