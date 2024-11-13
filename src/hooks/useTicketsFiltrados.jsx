import { useState, useCallback } from "react";
import { useApp } from "../contexts/useApp"; // Accedemos al contexto global de usuario
import { environments } from "../environments";
import useToken from "../hooks/useToken"; // Importar el hook useToken

export const useTicketsFiltrados = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketsLoaded, setTicketsLoaded] = useState(false); // Nuevo estado para evitar recargar
  const { user } = useApp(); // Obtener el usuario desde el contexto
  const { getToken } = useToken(); // Obtener el token usando useToken

  // Función para obtener tickets
  const fetchTickets = useCallback(async () => {
    if (ticketsLoaded || !user) return; // Evitar solicitudes innecesarias

    try {
      setLoading(true);
      const token = getToken();

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

      // Filtrar tickets según el puesto del usuario
      const filteredData =
        user.puesto === "responsable"
          ? data
          : data.filter((ticket) => ticket.idUsuario === user.idUsuario);
      setFilteredTickets(filteredData);

      setTicketsLoaded(true); // Marcar como cargados
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user, getToken, ticketsLoaded]); // Solo cambiar si `user` o `getToken` cambian

  // Función para filtrar tickets
  const filterTickets = useCallback(
    (criteria) => {
      if (!criteria) {
        setFilteredTickets(
          user.puesto === "responsable"
            ? tickets
            : tickets.filter((ticket) => ticket.idUsuario === user.idUsuario)
        );
        return;
      }

      const filtered = tickets.filter((ticket) =>
        ticket.descripcion.toLowerCase().includes(criteria.toLowerCase())
      );
      setFilteredTickets(filtered);
    },
    [tickets, user] // Cambiar solo si `tickets` o `user` cambian
  );

  return { tickets, filteredTickets, filterTickets, loading, error, fetchTickets, setTickets};
};
