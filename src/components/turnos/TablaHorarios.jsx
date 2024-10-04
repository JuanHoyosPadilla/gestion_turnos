import './styleHorario.css';
import { db } from '../../services/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importar autoTable para generar tablas

const HORAS_MAXIMAS_SEMANALES = 44; // Horas máximas permitidas
const HORAS_COMIDA = 1; // Horas de comida a restar

// Variables para personalizar el PDF
const NOMBRE_EMPRESA = "Tu Empresa"; // Cambia el nombre de la empresa
const LOGO_URL = "url_del_logo_aqui"; // URL del logo o la ruta local
const NOMBRE_SUPERVISOR = "Juan Sebastián Hoyos Padilla"; // Nombre predeterminado del supervisor

export const TablaHorarios = ({ getDaysRange }) => {
    const [users, setUsers] = useState([]);
    const [horarios, setHorarios] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, "users");
                const querySnapshot = await getDocs(collectionRef);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(data);

                const initialHorarios = {};
                data.forEach(user => {
                    initialHorarios[user.id] = getDaysRange().map(() => ({
                        start: '08:00',
                        end: '18:00',
                        descanso: false
                    }));
                });
                setHorarios(initialHorarios);
            } catch (error) {
                console.error("Error al obtener los empleados: ", error);
            }
        };

        fetchData();
    }, [getDaysRange]);

    const handleTimeChange = (userId, dayIndex, type, time) => {
        setHorarios(prevHorarios => ({
            ...prevHorarios,
            [userId]: prevHorarios[userId].map((day, index) => (
                index === dayIndex ? { ...day, [type]: time } : day
            ))
        }));
    };

    const handleDescansoChange = (userId, dayIndex) => {
        setHorarios(prevHorarios => ({
            ...prevHorarios,
            [userId]: prevHorarios[userId].map((day, index) => (
                index === dayIndex ? { ...day, descanso: !day.descanso } : day
            ))
        }));
    };

    const calcularHoras = (horarios) => {
        let totalHoras = 0;
        horarios.forEach(({ start, end, descanso }) => {
            if (!descanso) {
                const startTime = new Date(`1970-01-01T${start}:00`);
                const endTime = new Date(`1970-01-01T${end}:00`);

                // Resta de la duración de la comida
                const horasTrabajadas = (endTime - startTime) / (1000 * 60 * 60) - HORAS_COMIDA;
                totalHoras += horasTrabajadas;
            }
        });
        return totalHoras; // Devolvemos el total de horas trabajadas
    };

    const esExcesoDeHoras = (userId) => {
        return calcularHoras(horarios[userId]) > HORAS_MAXIMAS_SEMANALES;
    };

    // Función para generar el PDF
    const generarPDF = () => {
        const doc = new jsPDF({ orientation: 'landscape' }); // Cambiar a orientación horizontal
        doc.setFontSize(16);
        doc.text(NOMBRE_EMPRESA, 10, 10); // Nombre de la empresa

        // Generar tabla
        const tableData = users.map(user => {
            const row = [user.nombre + ' ' + user.apellido];
            horarios[user.id].forEach(day => {
                const horas = day.descanso ? '0' : Math.floor(calcularHoras([day]));
                const horasTexto = day.descanso ? 'Descanso' : `${day.start} - ${day.end}`; // Texto de horas según descanso
                row.push(horasTexto); // Agregar horas de inicio y fin o "Descanso"
                row.push(horas); // Agregar horas trabajadas o "0"
            });
            row.push(Math.floor(calcularHoras(horarios[user.id]))); // Total
            return row;
        });

        autoTable(doc, {
            head: [['Empleado', ...getDaysRange().flatMap(day => [`${day.dayOfWeek} ${day.day}`, 'Horas']), 'Total Horas']],
            body: tableData,
            startY: 30, // Cambiar la posición de inicio de la tabla
            margin: { top: 20, right: 10, bottom: 20, left: 10 }, // Ajustar márgenes
            theme: 'grid',
            styles: {
                cellPadding: 2, // Espaciado interno de las celdas
                fontSize: 10,
                minCellHeight: 10, // Altura mínima de las celdas
                halign: 'center', // Alinear contenido al centro
            },
        });

        // Espacio para el supervisor
        const firmaY = doc.autoTable.previous.finalY + 20; // Posición de la firma
        doc.text('_______________________', 10, firmaY + 10); // Espacio para la firma
        doc.text(` ${NOMBRE_SUPERVISOR}`, 10, firmaY+20); // Nombre del supervisor

        doc.save('horarios.pdf'); // Nombre del archivo
    };

    return (
        <div className='container-horario'>
            <button onClick={generarPDF}>Generar PDF</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Empleado</th>
                        {getDaysRange().map((day, index) => (
                            <th key={index}>{day.dayOfWeek} - {day.day}</th>
                        ))}
                        <th>Total Horas</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nombre} {user.apellido}</td>
                            {horarios[user.id].map((day, dayIndex) => (
                                <td key={dayIndex}>
                                    <input
                                        type="checkbox"
                                        checked={day.descanso}
                                        onChange={() => handleDescansoChange(user.id, dayIndex)}
                                    />
                                    <label>Descanso</label>
                                    {!day.descanso && (
                                        <>
                                            <input
                                                type="time"
                                                value={day.start}
                                                onChange={(e) => handleTimeChange(user.id, dayIndex, 'start', e.target.value)}
                                            />
                                            -
                                            <input
                                                type="time"
                                                value={day.end}
                                                onChange={(e) => handleTimeChange(user.id, dayIndex, 'end', e.target.value)}
                                            />
                                            {esExcesoDeHoras(user.id) && <span style={{ color: 'red' }}> Excede 44 horas</span>}
                                        </>
                                    )}
                                </td>
                            ))}
                            <td>{calcularHoras(horarios[user.id]).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
