// COMPONENTE DE LOGIN, CONTIENE EL FORMULARIO
import { useApp } from '../contexts/useApp';
import FormComponent from '../components/FormComponent'
import './css/Login.css';



export default function Login() {
  const { setUser } = useApp();

  return (
    <>
      <div className='container-login' >
      <FormComponent setUser={setUser} />
      </div>
    </> 
  )
}
