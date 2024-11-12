import { useState, useEffect } from "react";
import { environments } from "../environments";
import useToken from "./useToken"; // Asegúrate de importar correctamente el hook

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useToken(); // Obtén el token directamente desde el hook

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Obtener el token desde el hook
        const token = getToken();
        if (!token) {
          throw new Error("Token no disponible");
        }

        // Realizar la petición a la API
        const response = await fetch(`${environments.API_URL}/tickets`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificar si la respuesta es válida
        if (response.status === 401) {
          throw new Error("No autorizado. Verifica el token.");
        }

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Parsear los datos
        const data = await response.json();

        // Actualizar el estado
        setTickets(data);
      } catch (error) {
        console.error("Error al obtener tickets:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [getToken]); // Asegúrate de incluir getToken como dependencia

  return { tickets, loading, error };
};

export default useTickets;
