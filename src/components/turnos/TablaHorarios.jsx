import './styleHorario.css'
import { db } from '../../services/firebase.js'
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
export const TablaHorarios = ({ getDaysRange }) => {

    const [users, setUsers] = useState([])

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
    }, []);

    console.log(users)
    return <div className='container-horario'>
        <table className="table">
            <thead>
                <tr>
                    <th>Empleado</th>
                    {
                        getDaysRange().map((day, index) => (
                            <th key={index} >{day.dayOfWeek}-{day.day}</th>

                        ))
                    }

                </tr>


            </thead>
            <tbody>
                {
                    users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nombre} {user.apellido}</td> {/* Corrigido de mombres a nombres */}
                            <td>08:00 am - 18:00pm</td>
                            <td>08:00 am - 18:00pm</td>
                            <td>08:00 am - 18:00pm</td>
                            <td>08:00 am - 18:00pm</td>
                            <td>08:00 am - 18:00pm</td>
                            <td>08:00 am - 18:00pm</td>
                            <td>08:00 am - 18:00pm</td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    </div>
}