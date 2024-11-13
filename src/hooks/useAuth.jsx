import { useState } from 'react';
import { environments } from '../environments';

// Custom hook
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);

    // Todo lo que pueda petar empieza aqui, AJAX
    const response = await fetch(`${environments.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();

    if (response.ok) {
      const token = data.token;
      if (rememberMe) {
        localStorage.setItem('token', token);  // Token guardado permanentemente (tiene caducidad, pero que lo decida el encargado de la DB)
      } else {
        sessionStorage.setItem('token', token);  // Token guardado por la sesión actual, normal para pruebas
      }
      console.log(data);
      return data;
    } else {
      throw new Error(data.message || 'Usuario y contraseña no validos'); //Lanza una excepción 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  return { login, logout, loading, error, setError, setLoading};
};
