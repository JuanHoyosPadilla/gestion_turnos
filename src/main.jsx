import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Turnos from './pages/Turnos.jsx'
import Empleados from './pages/Empleados.jsx'
import Servicios from './pages/Servicios.jsx'
import Configuraciones from './pages/Configuraciones.jsx'

const router = createBrowserRouter([
  {
  path: "/",
  element: <App/>,
  children: [
    {
      path: "/turnos",
      element: <Turnos/>
    },
    {
      path: "/empleados",
      element: <Empleados/>
    },
    {
      path: "/servicios",
      element: <Servicios/>
    },
    {
      path: "/configuraciones",
      element: <Configuraciones/>
    },
    
  ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
