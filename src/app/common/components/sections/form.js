import React, { useState } from 'react';
import "./all-sections.css";

const initialState = {
    username: "",
    surname: "",
    email: "",
    phone: "",
    address: ""
};

const FormComponent = (props) => {
    const [
        { username, email, surname, address, phone },
        setState
    ] = useState(initialState);

    const onChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const onButtonClickHandler = (event) => {
        props.textQuery(`Moje dane to imię: ${username}, nazwisko: ${surname}, adres zamieszkania: ${address}, numer telefonu: ${phone}, email: ${email}.`);
    }

    const options = [
        {
            text: props.formInfo.fields.data.structValue.fields,
            placeholder: props.formInfo.fields.data.structValue.fields,
        },
    ];

    return <div><div className="d-flex align-items-start flex-wrap p-4 admission-info-container">
        <div>
            <form>
                <h5 className="fw-bold">{options.map(el => el.text.label_name.stringValue)}</h5>
                <input
                    name="username"
                    value={username}
                    placeholder={options.map(el => el.text.placeholder_name.stringValue)}
                    className="admission-info-button"
                    style={{ width: '280px' }}
                    onChange={onChange}
                />

                <h5 className="fw-bold pt-4">{options.map(el => el.text.label_surname.stringValue)}</h5>
                <input
                    name="surname"
                    value={surname}
                    placeholder={options.map(el => el.text.placeholder_surname.stringValue)}
                    className="admission-info-button"
                    style={{ width: '280px' }}
                    onChange={onChange}
                />

                <h5 className="fw-bold pt-4">{options.map(el => el.text.label_address.stringValue)}</h5>
                <input
                    name="address"
                    value={address}
                    placeholder={options.map(el => el.text.placeholder_address.stringValue)}
                    className="admission-info-button"
                    style={{ width: '280px' }}
                    onChange={onChange}
                />

                <h5 className="fw-bold pt-4">{options.map(el => el.text.label_phone.stringValue)}</h5>
                <input
                    name="phone"
                    value={phone}
                    placeholder={options.map(el => el.text.placeholder_phone.stringValue)}
                    className="admission-info-button"
                    style={{ width: '280px' }}
                    onChange={onChange}
                />

                <h5 className="fw-bold pt-4">{options.map(el => el.text.label_email.stringValue)}</h5>
                <input
                    name="email"
                    value={email}
                    placeholder={options.map(el => el.text.placeholder_email.stringValue)}
                    className="admission-info-button"
                    style={{ width: '280px' }}
                    onChange={onChange}
                />
            </form>
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

export default FormComponent
