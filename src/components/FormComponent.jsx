import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import '../views/css/Login.css';
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/useApp";

export default function FormComponent() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useApp();
  const [rememberMe, setRememberMe] = useState(false);  // Estado para 'remember me'
  const { login, loading, error, setError, setLoading} = useAuth();  // Usa el hook

  // Agrega async a la función
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try{
      const data = await login(email, password, rememberMe); //recolecta lo que devuelve la funcion login
      setUser(data.user) //asignacion de datos en un componente
      navigate('/admin/list-ticket')
    }
    catch(err){
      setError(err)
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="container-form-login">
        <p className="titulo-login">Login</p>
        <form onSubmit={handleOnSubmit}>
          <div className="contenedor-inputs">
            <p className="etiqueta-input">Ingresar usuario</p>
            <input className="input-login-estilo" value={email} placeholder="Usuario" onChange={(event) => setEmail(event.target.value)} type="email" id="email" />
          </div>

          <div className="contenedor-inputs">
            <p className="etiqueta-input">Ingresar contraseña</p>
            <input className="input-login-estilo" value={password} placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} type="password" id="password" />
          </div>

          <div className="contenedor-checkbox">
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>

          <button type="submit" className="btn-ingresar" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

          {/* Muestra el error si existe */}
          {error && <p className="mensaje-error">{error.message}</p>}
        </form>
      </div>
    </>
  );
}

