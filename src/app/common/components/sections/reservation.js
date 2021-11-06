import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pl", pl);

const ReservationComponent = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [numberPeople, setNumberPeople] = useState("");
    const [numberDay, setNumberDay] = useState("");

    const options = [
        {
            text: props.dateInfo.fields.data.structValue.fields,
        },
    ];

    const onButtonClickHandler = (event) => {
        props.textQuery(`Chciałbym dokonać rezerwacji ${new Date(startDate).toISOString().slice(0, 10)} na ${numberDay} dni dla ${numberPeople} osób.`);
    }

    useEffect(() => {
        for (var day = 1; day <= 100; day++) {
            document.getElementById('select-time').add(new Option(day));
        }

        for (var number_people = 1; number_people <= 4; number_people++) {
            document.getElementById('select-people').add(new Option(number_people));
        }

    }, []);

    return <div><div className="d-flex align-items-start flex-wrap p-4 admission-info-container">
        <h5 className="fw-bold pt-4">{options.map(el => el.text.date.stringValue)}</h5>
        <DatePicker
            locale="pl"
            selected={startDate}
            minDate={startDate}
            onChange={(date) => setStartDate(date)}
            className="admission-info-button w-100"
        />
        <h5 className="fw-bold pt-4">{options.map(el => el.text.how_long.stringValue)}</h5>
        <div className="w-100 view-value">
            <select 
                id="select-time"
                className="admission-info-button w-100" 
                onChange={event => setNumberDay(event.target.value)} 
            >
                <option value="">Wybierz liczbę dni...</option>
            </select>
        </div>
        <h5 className="fw-bold pt-4">{options.map(el => el.text.how_people.stringValue)}</h5>
        <div className="w-100 view-value">
            <select 
                id="select-people"
                className="admission-info-button w-100" 
                onChange={event => setNumberPeople(event.target.value)} 
            >
                <option value="">Wybierz liczbę osób w pokoju...</option>
            </select>
        </div>
    </div>
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

export default ReservationComponent
