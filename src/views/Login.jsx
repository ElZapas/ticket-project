// COMPONENTE DE LOGIN, CONTIENE EL FORMULARIO
import { useEffect } from 'react';
import FormComponent from '../components/FormComponent'
import { useApp } from '../contexts/useApp';
import { environments } from '../environments';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
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
      navigate('/home')
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
      <div className='container-login' >
<<<<<<< HEAD

        
        <FormComponent/>
      
=======
        <FormComponent />
>>>>>>> e7360ca2b42847b4139050567b11b56f341b2887
      </div>
    </>
  )
}
