import { environments } from "../environments";
import useToken from "../hooks/useToken";

export const useTecnicosAcciones = () => {
  const { getToken } = useToken();

  const getValidToken = () => {
    const token = getToken();
    if (!token) throw new Error("No se encontró el token");
    return token;
  };

  const deshabilitarTecnico = async (idTecnico) => {
    try {
      const token = getValidToken();

      // Log del ID y el token antes de la solicitud
      console.log("ID Técnico:", idTecnico);
      console.log("Token:", token);

      const response = await fetch(`${environments.API_URL}/users/${idTecnico}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw Error("Error en la solicitud");
      return await response.json();
    } catch (error) {
      console.error("Error:", error.message);
      console.log(idTecnico);
      throw error;
    }
  };

  return { deshabilitarTecnico };
};
