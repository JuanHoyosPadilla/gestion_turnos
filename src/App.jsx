
import './App.css'
import {Link, Outlet} from "react-router-dom"

function App() {
 
  return (
    <div className='container-principal'>
    
    <section className='menu-container'>
      <nav>
        <div className='logo'>
          <span>Logo</span>
        </div>
        <ul>
          <li>
            <Link to={'/turnos'}>Turnos</Link>
          </li>
          <li><Link to={'/empleados'}>Empleados</Link></li>
          <li><Link to={'/servicios'}>Servicios</Link></li>
          <li><Link to={'/configuraciones'}>Configuraciones</Link></li>
        </ul>
      </nav>
    </section>

    <section className='pagina-detalle'>
      <Outlet/>
    </section>
    </div>

    
  )
}

export default App
