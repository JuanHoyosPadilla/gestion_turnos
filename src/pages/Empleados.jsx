import { FormEmpleados } from "../components/formularioEmpleado/FormEmpleados";
import { VistaTodosEmpleados } from "../components/vistaEmpleados/VistaTodosEmpleados";

export default function Empleados(){
    
    return <section>
        <h2>Gestion de Empleados</h2>
        <FormEmpleados/>
        <VistaTodosEmpleados/>
    </section>
}