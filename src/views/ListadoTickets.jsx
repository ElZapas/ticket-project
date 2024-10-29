// components/Header.js

import { useEffect } from "react";
import { useApp } from "../contexts/useApp";
import { environments } from "../environments";
import TablaTickets from "../components/TablaTickets";
import useAuthGuard from "../hooks/guards/useAuthGuard";

const ListadoTickets = () => {
  useAuthGuard() //verifica redirecciones

  const { user, setUser } = useApp() // importando el hook, de manera "rapida" (para typear)
  const getUserData = async (token) => {
    try {
      const response = await fetch(`${environments.API_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      setUser(data);  // Guardamos el usuario en el contexto global
    } catch (error) {
      console.log(error);
    }
  };

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');

    if (!user) {
      if (localToken != null) {
        getUserData(localToken);  // Obtenemos los datos del usuario usando el token almacenado localmente
      } else if (sessionToken != null) {
        getUserData(sessionToken);  // Obtenemos los datos del usuario si hay un token en sessionStorage
      }
    }
  }, []);
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
