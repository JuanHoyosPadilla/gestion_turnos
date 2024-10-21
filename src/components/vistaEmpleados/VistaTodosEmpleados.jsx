import './EstilosTabla.css';
import { db } from '../../services/firebase.js';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export const VistaTodosEmpleados = () => {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar si estamos editando
    const [currentUser, setCurrentUser] = useState({
        id: '',
        nombre: '',
        apellido: '',
        telefono: '',
        cargo: ''
    });

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
            console.log('Usuario eliminado correctamente');
        } catch (error) {
            console.error('Error eliminando el usuario: ', error);
        }
    };

    const handleEditClick = (user) => {
        setIsEditing(true);
        setCurrentUser(user); // Carga los datos del usuario en el formulario de edición
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value }); // Actualiza el estado del usuario que se está editando
    };

    const handleUpdateUser = async () => {
        try {
            const docRef = doc(db, 'users', currentUser.id);
            await updateDoc(docRef, {
                nombre: currentUser.nombre,
                apellido: currentUser.apellido,
                telefono: currentUser.telefono,
                cargo: currentUser.cargo
            });
            setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
            setIsEditing(false); // Oculta el formulario de edición
            console.log('Usuario actualizado correctamente');
        } catch (error) {
            console.error('Error actualizando el usuario: ', error);
        }
    };

    return (
        <div className='container-vista'>
            {isEditing ? (
                <div className='contenedor-editar'>
                    <h2>Editar Usuario</h2>
                    <form>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="nombre"
                                value={currentUser.nombre}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Apellido:
                            <input
                                type="text"
                                name="apellido"
                                value={currentUser.apellido}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Teléfono:
                            <input
                                type="text"
                                name="telefono"
                                value={currentUser.telefono}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Cargo:
                            <input
                                type="text"
                                name="cargo"
                                value={currentUser.cargo}
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className='btn'>
                        <button type="button" onClick={handleUpdateUser}>Guardar</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>

                        </div>
                    </form>
                </div>
            ) : (
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
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellido}</td>
                                    <td>{user.telefono}</td>
                                    <td>{user.cargo}</td>
                                    <td className='btn-acction'>
                                        <button  onClick={() => handleEditClick(user)}><CiEdit style={{color: 'green',fontSize: '20px'}} /></button>
                                        <button  onClick={() => eliminarUsuario(user.id)}><MdDeleteForever style={{color: 'red',fontSize: '20px'}}/></button>
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
            )}
        </div>
    );
};
