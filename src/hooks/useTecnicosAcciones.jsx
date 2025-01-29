import { environments } from "../environments";
import useToken from "./useToken";

export const useTecnicosAcciones = () => {
  const { getToken } = useToken();

  const handleRequest = async (url, method, body = null) => {
    const token = getToken();
    if (!token) throw new Error('No autenticado');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    console.log(body)

    const response = await fetch(`${environments.API_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }

    return await response.json();
  };

  const deshabilitarTecnico = (id) => handleRequest(`/users/${id}`, 'DELETE');
  
  const editarTecnico = (id, data) => handleRequest(`/users/${id}`, 'PUT', data);
  
  const agregarTecnico = (data) => handleRequest('/users', 'POST', data);

  return { deshabilitarTecnico, editarTecnico, agregarTecnico };
};