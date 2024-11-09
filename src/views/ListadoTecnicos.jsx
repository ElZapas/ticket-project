// components/Header.js
import TablaTecnicos from "../components/TablaTecnicos";
import useNotAuthGuard from "../hooks/guards/useNotAuthGuard";

const ListadoTecnicos = () => {
  useNotAuthGuard() 

  const tecnicos = [
    {
      idTecnico: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan.perez@example.com',
      area: 'Soporte'
    },
    {
      idTecnico: 2,
      nombre: 'María',
      apellido: 'García',
      correo: 'maria.garcia@example.com',
      area: 'Redes'
    },
    {
      idTecnico: 3,
      nombre: 'Carlos',
      apellido: 'López',
      correo: 'carlos.lopez@example.com',
      area: 'Desarrollo'
    }
  ];
  

  return (
    <div className="app-container">
      <div className="content">
        <div className="table-container">
          <TablaTecnicos tecnicos={tecnicos}/>
        </div>
      </div>
    </div>
  );
};

export default ListadoTecnicos;
