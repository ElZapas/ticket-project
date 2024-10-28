import '../views/css/TablaTickets.css'; // Importa estilos opcionales

const data = Array(20).fill({
  id: 'TEXT',
  nombre: 'TEXT',
  valor: 'TEXT',
  fechaCreacion: 'TEXT',
  categoria: 'TEXT',
  tecnico: 'TEXT',
  solucion: 'TEXT',
  estado: 'TEXT',
});

const TablaTickets = () => {
  return (
    <div className="table-container">
      
      <div className="contenedor1-listado">

      <h2>Listado de Tickets</h2>
      <div className="filters">
        <input type="text" placeholder="Técnico" />
        <select>
          <option value="value">Value</option>
        </select>
        <select>
          <option value="abierto">Abierto</option>
        </select>
        <button>Agregar</button>
      </div>
      </div>
    
    <div className='tabla-contenedor'>

    
      <table className="tabla-estilo">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Fecha de creación</th>
            <th>Categoría</th>
            <th>Técnico</th>
            <th>Solución</th>
            <th>Editar</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.id}</td>
              <td>{ticket.nombre}</td>
              <td>{ticket.valor}</td>
              <td>{ticket.fechaCreacion}</td>
              <td>{ticket.categoria}</td>
              <td>{ticket.tecnico}</td>
              <td>{ticket.solucion}</td>
              <td><button>Editar</button></td>
              <td>{ticket.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="pagination">
        <button>Previous</button>
        <span>1</span>
        <button>Next</button>
      </div>
    </div>
  );
};

export default TablaTickets;
