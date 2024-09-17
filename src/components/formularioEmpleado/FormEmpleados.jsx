import { useState } from 'react'
import './estilosFormEmpleados.css'
import {db} from '../../services/firebase.js'
import {collection,addDoc} from 'firebase/firestore'
export const FormEmpleados = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setNumero] = useState('');
    const [cargo, setCargo] = useState('');
    
    //funciones para recolectar los datos del formulario
    const obtenerNombre = (e) => {
        setNombre(e.target.value)
    }

    const obtenerApellido = (e) => {
        setApellido(e.target.value);
    }

    const obtenerNumero = (e) => {
        setNumero(e.target.value);
    }

    const obtenerCargo = (e) => {
        setCargo(e.target.value);
    }

    async function guardarDato() {
        try {
            const docRef = await addDoc(collection(db,'users'),{
                nombre: nombre,
                apellido:apellido,
                telefono:telefono,
                cargo:cargo
            });
            console.log('Dato guardado', docRef.id)
        } catch (error) {
            console.error('Error al guardar el empleado: ',error)
        }
        
    }

    const enviarDatos = (e)=> {
        e.preventDefault();
        console.log('Datos relectados: ', {nombre,apellido,telefono,cargo})
        guardarDato()
    }

    
    return <div className='container_fomulario'>
        <div className="formulario_container">
            <form onSubmit={enviarDatos}>
                <div>
                    <input type="text" value={nombre} onChange={obtenerNombre} placeholder="Nombre completo" />
                </div>
                <div>
                    <input type="text" value={apellido} onChange={obtenerApellido} placeholder="Apellido" />
                </div>
                <div>
                    <input type="number" value={telefono} onChange={obtenerNumero} placeholder="Telefono" />
                </div>
                <div>
                    <input type="text" value={cargo} onChange={obtenerCargo} placeholder="Cargo" />
                </div>
                <div>
                    <button type='submit' >Guardar empleado</button>
                </div>
            </form>
        </div>
    </div>
}