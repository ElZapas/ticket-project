import { useState } from "react"
import '../views/css/Login.css';

export default function FormComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleOnSubmit = (event) => {
    event.preventDefault(); 
    console.log({email, password}) 
  }

  return (
    <>
      <div className="container-form-login">

        <p className="titulo-login">Login</p>
        <form onSubmit={handleOnSubmit}>
          <div className="contenedor-inputs">
            <p className="etiqueta-input">Ingresar usuario</p>
            <input className="input-login-estilo"  value={email} placeholder="Usuario" onChange={(event) => setEmail(event.target.value)} type="email" id="email" />
          </div>

          <div className="contenedor-inputs">
            <p className="etiqueta-input">Ingresar contraseña</p>
            <input className="input-login-estilo" value={password} placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} type="password" id="password" />
            <a className="etiqueta-recuperar">Recuperar contraseña</a>
          </div>
          
          <button type="submit" className="btn-ingresar">Iniciar sesión</button>
        </form>
      </div>
    </>
  )
}
