import { useState, useEffect } from 'react';
import { environments } from '../environments';
import useToken from './useToken';

export const useTecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useToken();

  const fetchTecnicos = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error('No autenticado');

      const response = await fetch(`${environments.API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error en la solicitud');
      
      const data = await response.json();
      setTecnicos(data ?? []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTecnicos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTecnicos();
  }, []);

  return { tecnicos, loading, error, refetch: fetchTecnicos };
};

