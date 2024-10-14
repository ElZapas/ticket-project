import { useState } from "react";

export default function RegisterComponent() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpass, setConfirmpass] = useState('')
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log({email, password}) 
  }
  return (
    <>
      <div>RegisterComponent</div>
      <form onSubmit={handleOnSubmit}>
        <label>Nombre Completo:</label>
        <input value={name} onChange={(event) => setName(event.target.value)} type="text" id="nombre" required></input><br></br>
        <label>Correo Electrónico:</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" id="email" required></input><br></br>
        <label>Contraseña:</label>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="password" required></input><br></br>
        <label>Confirmar Contraseña:</label><br></br>
        <input value={confirmpass} onChange={(event) => setConfirmpass(event.target.value)} type="password" id="confirm_password" required></input><br></br>
        <button type="submit">Ingresar datos</button>
      </form>
    </>
  )
}
