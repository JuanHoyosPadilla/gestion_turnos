
import './styleHorario.css'
export const TablaHorarios = ({ getDaysRange }) => {

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
                <tr>
                    <td>Juan hoyos</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                </tr>
                <tr>
                    <td>Juan hoyos</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                    <td>08:00 am - 18:00pm</td>
                </tr>
            </tbody>
        </table>
    </div>
}