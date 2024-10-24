//COMPONENTE PRINCIPAL, AQUI SE ASIGNAN RUTAS QUE SE IRAN TRABAJANDO A LO LARGO DEL PROYECTO
import { StrictMode } from 'react' // importacion de strictMode, para comprobar errores de depuracion
import { createRoot } from 'react-dom/client' // Creacion de rutas usando el hook de React
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Router provider, para usar rutas
//importaciones de componentes a rutas
import Layout from './layouts/Layout'
import Login from './views/Login'
import Home from './views/Home'
import './index.css'
import { AppProvider } from './contexts/AppContext'

// Estructura de rutas, a lo largo que se agregan mas vistas se van a ingresar aqui para ser vistas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '',
        element: <Login/>
      }
    ]
  }
])
// usando las rutas en el render
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AppProvider> 
    <RouterProvider router={router} />
  </AppProvider>
</StrictMode>
)
