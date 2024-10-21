import './EstilosTabla.css';
import { db } from '../../services/firebase.js';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const VistaTodosEmpleados = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, "users");
                const querySnapshot = await getDocs(collectionRef);
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setUsers(data);
            } catch (error) {
                console.error("Error al obtener los empleados: ", error);
            }
        };

        fetchData();
    }, []);

    const eliminarUsuario = async (id) => {
        try {
            const docRef = doc(db,'users', id);
            await deleteDoc(docRef);
            setUsers(users.filter((user) => user.id !== id));
            console.log('Usuario Eliminado correctamente')
            
        } catch (error) {
            console.error('Error eliminando el usuario: ', error)
        }
    }

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
                            <tr key={user.id}>
                                <td>{user.nombre}</td> {/* Corrigido de mombres a nombres */}
                                <td>{user.apellido}</td>
                                <td>{user.telefono}</td>
                                <td>{user.cargo}</td>
                                <td>
                                    <button>Editar</button>
                                    <button onClick={() => eliminarUsuario(user.id)}>Eliminar</button>
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
