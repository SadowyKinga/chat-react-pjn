import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../../../firebase";

registerLocale("pl", pl);

const DateComponent = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [startType, setStartType] = useState("");
    const [data, setData] = useState([])

    const options = [
        {
            text: props.dateInfo.fields.data.structValue.fields,
        },
    ];

    const onButtonClickHandler = (event) => {
        props.textQuery(`Umów mnie na ${startType} ${new Date(startDate).toISOString().slice(0, 10)} o ${startTime}.`);
    }

    const getData = () => {
        db.ref('zabiegi').once("value").then((snapshot) => {
            const val = snapshot.val();
            const names = Object.values(val).map(e => e.nazwa || 'Brak nazwy');
            setData(names);
        })
    }

    useEffect(() => {
        getData();
           
        for (var day = 1; day <= 100; day++) {
            document.getElementById('select-time').add(new Option(day));
        }

        for (var number_people = 1; number_people <= 4; number_people++) {
            document.getElementById('select-people').add(new Option(number_people));
        }

    }, []);

    const getDataValue  = () =>{
        data.forEach((product) => {
            document.getElementById('select-type').add(new Option(product));
        })
    }
    return <div><div className="d-flex align-items-start flex-wrap p-4 admission-info-container">
        <h5 className="fw-bold">{options.map(el => el.text.typ.stringValue)}</h5>
        <div className="w-100 view-value">
            <select 
                id="select-type"
                className="admission-info-button w-100"   
                onChange={event => setStartType(event.target.value)} 
                onClick={getDataValue}
            >
                <option value="Wybierz zabieg...">Wybierz zabieg...</option>
            </select>
        </div>
        <h5 className="fw-bold pt-4">{options.map(el => el.text.date.stringValue)}</h5>
        <DatePicker
            locale="pl"
            selected={startDate}
            minDate={startDate}
            onChange={(date) => setStartDate(date)}
            className="admission-info-button w-100"
        />
        <h5 className="fw-bold pt-4">{options.map(el => el.text.time.stringValue)}</h5>
        <div className="w-100 view-value">
            <select 
                id="select-time"
                className="admission-info-button w-100" 
                onChange={event => setStartTime(event.target.value)} 
            >
                <option value="Wybierz godzinę...">Wybierz godzinę...</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="15:00">15:00</option>
            </select>
        </div></div>
        <div className="d-flex justify-content-end p-4">
            <button
                className="admission-info-button"
                onClick={onButtonClickHandler}
            >
                {options.map(el => el.text.submit.stringValue)}
            </button>
        </div>

    </div>
};

export default DateComponent
