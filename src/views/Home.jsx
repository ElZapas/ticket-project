import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { environments } from '../environments';
import { useApp } from '../contexts/useApp';

export default function Home() {
  const { user, setUser } = useApp();  // Usamos el contexto global para el estado del usuario

  // Usamos useCallback para memorizar la función y evitar advertencias de dependencias
  const getUserData = useCallback(async (token) => {
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
  }, [setUser]);

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');

    if (localToken != null) {
      getUserData(localToken);  // Obtenemos los datos del usuario usando el token almacenado localmente
    } else if (sessionToken != null) {
      getUserData(sessionToken);  // Obtenemos los datos del usuario si hay un token en sessionStorage
    }
  }, [getUserData]);  // Añadimos getUserData como dependencia del useEffect

  return (
    <>
      <h1>Home</h1>
      <Link to="/">Acceder</Link>
      {user ? <p>Hola, {user.name}</p> : <p>Usuario no registrado, Debe iniciar sesion.</p>}
    </>
  );
}
