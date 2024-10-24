import { Link } from 'react-router-dom';
import { useApp } from '../contexts/useApp';
import useAuthGuard from '../hooks/guards/useAuthGuard';
import { useEffect } from 'react';
import { environments } from '../environments';

export default function Home() {
  useAuthGuard() //verifica redirecciones

  const { user, setUser } = useApp();  // Usamos el contexto global para el estado del usuario
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
    <>
      <h1>Home</h1>
      <Link to="/">Acceder</Link>
      {user ? <p>Hola, {user.name}</p> : <p>Usuario no registrado, usted debe iniciar sesion.</p>} 
    </>
    // Ternaria que hace saber si hemos iniciado sesion en el sistema 
  );
}
