import './EstilosTabla.css'
export const VistaTodosEmpleados = () => {
    return <div className='container-vista'>
        <table className="table">
            <thead>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Telefono</th>
                <th>Cargo</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                <tr>
                    <td>Juan sebastian</td>
                    <td>Hoyos Padill</td>
                    <td>3235817842</td>
                    <td>Aux Sistemas</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>Juan sebastian</td>
                    <td>Hoyos Padill</td>
                    <td>3235817842</td>
                    <td>Aux Sistemas</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}