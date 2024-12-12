import { useState, useEffect } from 'react';
import { environments } from '../environments';
import useToken from './useToken';

export const useTecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useToken();

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        // Obtener el token desde el hook
        const token = getToken();
        if (!token) {
          throw new Error("Token no disponible");
        }

        // Realizar la petición a la API
        const response = await fetch(`${environments.API_URL}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('No tienes permisos para ver esta información.');
        }

        const data = await response.json();

        // Comprobar si la respuesta es un array o contiene la clave 'tecnicos'
        if (Array.isArray(data)) {
          setTecnicos(data);
        } else if (data && Array.isArray(data.tecnicos)) {
          setTecnicos(data.tecnicos);
        } else {
          setTecnicos([]);
          setError("Formato de respuesta inesperado.");
        }
      } catch (error) {
        setError(error.message || 'Hubo un error al cargar los técnicos.');
      } finally {
        setLoading(false);
      }
    };

    fetchTecnicos();
  }, []);

  return { tecnicos, loading, error };
};

export default useTecnicos;

