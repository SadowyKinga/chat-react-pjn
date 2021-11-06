import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from '../app/common/components/sections/message';
import { List, Avatar, Icon } from 'antd';
import Card from '../app/common/components/sections/card';
import FormComponent from '../app/common/components/sections/form';
import DateComponent from '../app/common/components/sections/date';
import InformationComponent from "../app/common/components/sections/information";
import ReservationComponent from '../app/common/components/sections/reservation';
import Loading from '../styles/animations/loading-message/loading-message'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import "./chatbot.css";
import { auth } from '../firebase';

function Chatbot() {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState("");
    const [loading, setLoading] = useState(undefined);
    const [done, setDone] = useState(undefined);
    const [token, setToken] = useState('');

    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {
        auth.onAuthStateChanged((result) => {
            if (result) {
                result.getIdToken().then((token) => {
                    setToken(token);
                });
            }
            else {
                setToken('')
            }
        })
        eventQuery('welcomeToMyWebsite');
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const textQuery = async (text) => {

        //  Wiadomość wysłana przez klienta   
        let conversation = {
            who: 'Użytkownik',
            content: {
                text: {
                    text: text
                }
            },
        }
        dispatch(saveMessage(conversation))

        // Wiadomość wysłana przez ChatBot'a
        const textQueryVariables = {
            text
        }
        try {

            //Wysyłam zapytanie do textQuery - route
            const response = await Axios.post(
                'https://us-central1-sports-app-yssa.cloudfunctions.net/app/api/dialogflow/textQuery', 
                textQueryVariables, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            )
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'Bot',
                    content: content
                }
                dispatch(saveMessage(conversation))
            }
        } catch (error) {
            conversation = {
                who: 'Bot',
                content: {
                    text: {
                        text: "Wystąpił błąd!"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }

    const eventQuery = async (event) => {
        setLoading(undefined);
        setDone(undefined);
        //Wiadomość wysłana przez ChatBot'a 
        const eventQueryVariables = {
            event
        }
        try {
            //Wysyłam zapytanie do textQuery - route
            const response = await Axios.post('https://us-central1-sports-app-yssa.cloudfunctions.net/app/api/dialogflow/eventQuery', eventQueryVariables).then(
                setLoading(true),
                setTimeout(() => {
                    setDone(true);
                }, 1000),
            );
            for (let content of response.data.fulfillmentMessages) {
                let conversation = {
                    who: 'Bot',
                    content: content
                }
                dispatch(saveMessage(conversation))
            }
        } catch (error) {
            let conversation = {
                who: 'Bot',
                content: {
                    text: {
                        text: "Wystąpił błąd!"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }

    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return alert('Musisz najpierw wpisać wiadomość!')
            }
            //Wysyłam zapytanie do trasy zapytania tekstowego
            textQuery(e.target.value)
            e.target.value = "";
            setMessages("");
        }
    }

    const send = (e) => {
        e.preventDefault();
        if (messages !== "") {
            textQuery(messages);
            setMessages("");
        } else {
            return alert('Musisz najpierw wpisać wiadomość!')
        }
    }

    const renderCards = (cards) => {
        return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />)
    }

    const renderInformations = (informations) => {
        return informations.map((information, i) => <InformationComponent key={i} informationInfo={information.structValue} textQuery={textQuery} />)
    }

    const renderForms = (forms) => {
        return forms.map((form, i) => <FormComponent key={i} formInfo={form.structValue} textQuery={textQuery} />)
    }

    const renderDate = (date) => {
        return date.map((date, i) => <DateComponent key={i} dateInfo={date.structValue} textQuery={textQuery} />)
    }

    const renderReservation = (date) => {
        return date.map((date, i) => <ReservationComponent key={i} dateInfo={date.structValue} textQuery={textQuery} />)
    }

    const renderOneMessage = (message, i) => {
        console.log('message', message)
        //Warunek, aby  móc oddzielić rodzaje wiadomości

        //Szablon dla normalnych wiadomości oraz payload CUSTOM
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />

            //szablon wiadomości dla karty
        } else if (message.content && message.content.payload.fields.card) {
            return <div className="d-flex justify-content-end" key={i}>
                <List.Item>
                    <List.Item.Meta
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>
            </div>
        } else if (message.content && message.content.payload.fields.information) {
            return <div className="justify-content-start px-3" key={i}>
                <List.Item>
                    <List.Item.Meta
                        description={renderInformations(message.content.payload.fields.information.listValue.values)}
                    />
                </List.Item>
            </div>
        } else if (message.content && message.content.payload.fields.form) {
            return <div key={i} style={{ justifyContent: "center", display: 'flex', paddingBottom: '12px' }}>
                <div className="d-flex w-40 h-40 justify-content-center" style={{ visibility: 'collapse' }}>{<Avatar icon={<Icon type="robot" />} />}</div>
                <div className="w-70 form">
                    {renderForms(message.content.payload.fields.form.listValue.values)}
                </div>
            </div>
        } else if (message.content && message.content.payload.fields.payload) {
            return <div key={i} style={{ justifyContent: "center", display: 'flex', paddingBottom: '12px' }}>
                <div className="d-flex w-40 h-40 justify-content-center" style={{ visibility: 'collapse' }}>{<Avatar icon={<Icon type="robot" />} />}</div>
                <div className="w-50 form">
                    {renderDate(message.content.payload.fields.payload.listValue.values)}
                </div>
            </div>
        } else if (message.content && message.content.payload.fields.payload_reservation) {
            return <div key={i} style={{ justifyContent: "center", display: 'flex', paddingBottom: '12px' }}>
                <div className="d-flex w-40 h-40 justify-content-center" style={{ visibility: 'collapse' }}>{<Avatar icon={<Icon type="robot" />} />}</div>
                <div className="w-50 form">
                    {renderReservation(message.content.payload.fields.payload_reservation.listValue.values)}
                </div>
            </div>
        }
    }

    const messageEl = useRef(null);

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }

    return (
        <Grid container>
            <div className="content-body" ref={messageEl}>
                {!done ? (<Loading loading={loading} />) : (renderMessage(messagesFromRedux))}
                {console.log(renderMessage(messagesFromRedux))}
            </div>
            <div className='w-100 p-4 write-text'>
                <Grid item xs={11}>
                    <TextField
                        value={messages}
                        label="Napisz nową wiadomość..."
                        onKeyPress={keyPressHanlder}
                        onChange={event => setMessages(event.target.value)}
                        fullWidth
                    />
                    <div className="click-send">
                        <button className="h2 mb-0" onClick={send}><SendIcon /></button>
                    </div>
                </Grid>
            </div>
        </Grid>
    )
}

export default Chatbot;
