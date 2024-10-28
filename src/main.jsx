import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import Layout from './layouts/Layout'
import Login from './views/Login'
import Home from './views/Home'
//import Register from './views/Register'
import ListadoTickets from './views/ListadoTickets'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: '',
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '',
        element: <Home />
      }, 
      {
        path: '/list_ticket',
        element: <ListadoTickets/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
