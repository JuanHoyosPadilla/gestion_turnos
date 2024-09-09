import './estilosFormEmpleados.css'
export const FormEmpleados = () => {
    return <div className='container_fomulario'>
        <div className="formulario_container">
            <form>
                <div>
                    <input type="text" name="nombre" placeholder="Nombre completo" />
                </div>
                <div>
                    <input type="text" name="apellido" placeholder="Apellido" />
                </div>
                <div>
                    <input type="number" name="telefono" placeholder="Telefono" />
                </div>
                <div>
                    <input type="text" name="cargo" placeholder="Cargo" />
                </div>
                <div>
                    <button>Guardar empleado</button>
                </div>
            </form>
        </div>
    </div>
}