import { jwtDecode } from "jwt-decode";

export default function useToken() {
  const getToken = () => {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    return localToken || sessionToken
  }
  
  const isTokenValid = () => {
    const token = getToken();
    try {
      if (!token) throw new Error('Token no encontrado');
  
      const { exp } = jwtDecode(token);
  
      if (exp < Date.now() / 1000) throw new Error('Token expirado');
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } 
  };
  const getUserDataFromToken = () => {
    const token = getToken();
  
    try {
      if (!token) throw new Error('Token no encontrado');
  
      const decodedToken = jwtDecode(token);
  
      if (!decodedToken.user)
        throw new Error('Datos de usuario no encontrados en el token');
  
      return decodedToken.user;
    } catch (error) {
      console.log(error);
      
      return undefined;
    }
  };
  const hastoken = () =>{
    return !! getToken()
  }

  const clearToken = () =>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
  return{getToken, isTokenValid, getUserDataFromToken, hastoken, clearToken}
}
