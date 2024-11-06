// components/Header.js
import TablaTickets from "../components/TablaTickets";
import useNotAuthGuard from "../hooks/guards/useNotAuthGuard";

const ListadoTickets = () => {
  useNotAuthGuard() 
  return (
    <div className="app-container">
      <div className="content">
        <div className="table-container">
          <TablaTickets />
        </div>
      </div>
    </div>
  );
};

export default ListadoTickets;
