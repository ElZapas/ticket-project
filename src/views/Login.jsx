// COMPONENTE DE LOGIN, CONTIENE EL FORMULARIO
import FormComponent from '../components/FormComponent'
import useAuthGuard from '../hooks/guards/useAuthGuard';

import './css/Login.css';

export default function Login() {
 useAuthGuard('/admin/list-ticket')
  return (
    <>
      <div className='container-login' >
        <FormComponent />
      </div>
    </>
  )
}
