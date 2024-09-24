import './EstilosTabla.css';
import { db } from '../../services/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const VistaTodosEmpleados = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, "users");
                const querySnapshot = await getDocs(collectionRef);
                const data = querySnapshot.docs.map(doc => doc.data());
                setUsers(data);
            } catch (error) {
                console.error("Error al obtener los empleados: ", error);
            }
        };

        fetchData();
    }, [users]);

    return (
        <div className='container-vista'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>Cargo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.nombre}</td> {/* Corrigido de mombres a nombres */}
                                <td>{user.apellido}</td>
                                <td>{user.telefono}</td>
                                <td>{user.cargo}</td>
                                <td>
                                    <button>Editar</button>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay empleados para mostrar</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
