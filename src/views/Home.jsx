import { Link } from 'react-router-dom';
import { useApp } from '../contexts/useApp';
import useNotAuthGuard from '../hooks/guards/useNotAuthGuard';

/**
 * 
 * @returns 
 * @deprecated COMPONENTE OBSOLETO, ESTA AQUI POR TEMAS DE RECICLAJE DE LOGICA.
 */
export default function Home() {
  useNotAuthGuard() //verifica redirecciones
  const { user } = useApp();  // Usamos el contexto global para el estado del usuario
  return (
    <>
      <h1>Home</h1>
      <Link to="/">Acceder</Link>
      {user ? <p>Hola, {user.nombreUsuario}</p> : <p>Usuario no registrado, usted debe iniciar sesion.</p>} 
    </>
    // Ternaria que hace saber si hemos iniciado sesion en el sistema 
  );
}
