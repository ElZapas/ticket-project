import { StrictMode } from 'react'; // Importación del modo estricto para detección de errores
import { createRoot } from 'react-dom/client'; // Hook de React para renderizar la aplicación
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // React Router

// Importaciones de vistas y componentes
import Layout from './layouts/Layout'; // Layout para las rutas principales
import Login from './views/Login'; // Vista Login
import Home from './views/Home'; // Vista Home
import ListadoTickets from './views/ListadoTickets'; // Vista para Listado de Tickets

import './index.css'; // Estilos globales
import { AppProvider } from './contexts/AppContext'; // Contexto global de la app
import PageNotFound from './views/PageNotFound';
import ListadoTecnicos from './views/ListadoTecnicos';

// Estructura de rutas
const router = createBrowserRouter([
  {
    path: 'admin',
    element: <Layout />, // Usamos el Layout como contenedor principal
    children: [
      {
        path: 'home',
        element: <Home /> // Ruta para la vista Home
      },
      {
        path: 'list-ticket',
        element: <ListadoTickets /> // Ruta para Listado de Tickets
      },
      {
        path: 'list-tecnicos',
        element: <ListadoTecnicos /> // Ruta para Listado de Tickets
      },
    ]
  }, 
  {
    path: '',
    element: <Login /> // Ruta predeterminada (Login)
  },
  {
    path: '*',
    element: <PageNotFound/> 
  }
  
]);

// Render de la aplicación con RouterProvider y AppProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
