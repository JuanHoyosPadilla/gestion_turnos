import './stayleTurnos.css'
import { useEffect, useState } from "react";
import { TablaHorarios } from "../components/turnos/TablaHorarios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, getDate, addDays,differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';


export default function Turnos() {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [error, setError] = useState('')
  
    const handleStartDateChange = (date) => {
        setStartDate(date)
        validateDateRange(date,setEndDate)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date);
        validateDateRange(startDate,date)
    };

    const getDaysRange = () => {
        if (!startDate || !endDate) return [];
        let days = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            days.push({
                dayOfWeek: format(currentDate, 'eeee', { locale: es }),
                day: format(currentDate, 'd')
            });
            //currentDate.setDate(currentDate.getDate() + 1)
            currentDate = addDays(currentDate, 1)
        }
        return days;
    }

    const validateDateRange = (start, end) => {
        if (start && end) {
            const daysDifference = differenceInDays(end, start);
            if(daysDifference > 6){
                setError('El rango de fecha no puede exceder los 7 dias')
                setEndDate(addDays(start, 6))
                setStartDate(null)
                setEndDate(null)
            }else if (daysDifference < 6){
                setError('El rango de fechas debe ser al menos 7 dias.')
                setEndDate(addDays(start, 6))
                setStartDate(null)
                setEndDate(null)
            }else {
                setError('')
            }
          }
    }

    return <div>
        <h3>Gestion de Horarios</h3>
        <div className='container-date'>
            <h4>Selecciona un rango de fecha</h4>
            <div className='input'>
                <label>Fecha de Inicio</label>
                <DatePicker
                    selected={startDate}
                    onChange={ handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecciona una fecha"
                />
            </div>
            <div className='input'>
                <label>Fecha Final</label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecciona una fecha"
                />
            </div>
        </div>
        <div >
            {error && <p style={{color:'red'}}>{error}</p> }
            {
              !error && startDate && endDate ? <> <h3>Horario semanal  </h3>
                    <TablaHorarios getDaysRange={getDaysRange} /></>
                    : <p>Por favor, seleccione ambas fechas para ver el horario semanal.</p>
            }
        </div>

    </div>
}

