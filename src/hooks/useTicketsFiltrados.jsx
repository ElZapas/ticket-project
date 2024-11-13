import { useState, useEffect } from "react";
import { useApp } from "../contexts/useApp"; // Accedemos al contexto global de usuario
import { environments } from "../environments";
import useToken from "../hooks/useToken"; // Importar el hook useToken

export const useTicketsFiltrados = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useApp(); // Obtener el usuario desde el contexto
  const { getToken } = useToken(); // Obtener el token usando useToken

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = getToken(); // Obtener el token desde el hook useToken

      if (!token) {
        setError("No se encontró el token");
        setLoading(false);
        return;
      }

      const response = await fetch(`${environments.API_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener tickets");
      }

      const data = await response.json();
      setTickets(data);
      // Filtrar los tickets según el puesto del usuario
      const filteredData =
        user.puesto === "responsable"
          ? data
          : data.filter((ticket) => ticket.idUsuario === user.idUsuario); // Filtrado para técnicos
      setFilteredTickets(filteredData); // Establecer los tickets filtrados
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = (criteria) => {
    if (!criteria) {
      setFilteredTickets(tickets); // Si no hay criterio, mostrar todos los tickets filtrados
      return;
    }
    const filtered = tickets.filter((ticket) =>
      ticket.descripcion.toLowerCase().includes(criteria.toLowerCase())
    );
    setFilteredTickets(filtered); // Filtrar según el criterio proporcionado
  };

  useEffect(() => {
    fetchTickets(); // Cargar tickets cuando el token cambia o al inicio
  }, [user]); // Solo recargar cuando el puesto del usuario cambie

  return { tickets, filteredTickets, filterTickets, loading, error, fetchTickets };
};
