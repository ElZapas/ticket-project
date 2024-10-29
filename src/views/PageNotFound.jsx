import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
    <h1>¡Ruta no encontrada!</h1>
    <p>Al parecer la ruta que estas buscando no existe, intenta iniciar sesion para ver las vistas de la aplicacion.</p>
    <br />
    <p>Si ya estas registrado y necesitas volver, vuelve a Home.</p>
    <Link to='/admin/home'>Regresar</Link>
    </>
  )
}
