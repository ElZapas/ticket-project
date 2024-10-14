import { useState } from "react"

export default function FormComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleOnSubmit = (event) => {
    event.preventDefault(); 
    console.log({email, password}) 
  }

  return (
    <>
      <div>FormComponent</div>
      <form onSubmit={handleOnSubmit}>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" id="email" />
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="password" />
        <button type="submit">Ingresar</button>
      </form>
    </>
  )
}
