import { environments } from "../environments";
import useToken from "../hooks/useToken";

export const useTicketAcciones = () => {
  const { getToken } = useToken();

  const getValidToken = () => {
    const token = getToken();
    if (!token) throw new Error("No se encontró el token");
    return token;
  };

  const parseError = async (response) => {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido en la API");
  };

  const fetchWithTimeout = async (url, options, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  };

  const addTicket = async (ticketData) => {
    try {
      const token = getValidToken();
      const response = await fetchWithTimeout(`${environments.API_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) await parseError(response);
      return await response.json();
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const updateTicket = async (idTicket, updatedData) => {
    try {
      const token = getValidToken();
      const response = await fetchWithTimeout(`${environments.API_URL}/tickets/${idTicket}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) await parseError(response);
      return await response.json();
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const deleteTicket = async (idTicket) => {
    try {
      const token = getValidToken();
      const response = await fetchWithTimeout(`${environments.API_URL}/tickets/${idTicket}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) await parseError(response);
      return await response.json();
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  return { addTicket, updateTicket, deleteTicket };
};
