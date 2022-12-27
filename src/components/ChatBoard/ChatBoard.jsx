import styles from './ChatBoard.module.scss'

import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { useEffect } from 'react'
import { SOCKET_URL } from '../../constant/apiURL';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../app/reducers/userSlice';

var stompClient = null;
const ChatBoard = ({ id }) => {

    const user = useSelector(selectUserData)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        let Sock = new SockJS(SOCKET_URL);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }, [])

    const onConnected = () => {
        stompClient.subscribe(`/chatroom/${id}`, (payload) => handleReceiveMessage(payload.body))
        stompClient.send(`/app/join/${id}`, {}, JSON.stringify({
            id: user.id,
            name: user.displayName,
            email: user.email,
            avatar: user.avatar,
            message,
            type: 'JOIN'
        }))
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleReceiveMessage = (payload) => {
        const data = JSON.parse(payload)
        if (data.type == 'SEND')
        {
            messages.push(data)
            setMessages([...messages])
        }
        else
            console.log(data)
    }

    const handleSendMessage = () => {
        stompClient.send(`/app/message/${id}`, {}, JSON.stringify({
            id: user.id,
            name: user.displayName,
            email: user.email,
            avatar: user.avatar,
            message,
            type: 'SEND'
        }))
        setMessage('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                {
                    messages && messages.length > 0 && messages.map(message => {
                        return (
                            <>
                                {
                                    message.id == user.id ?
                                        <div className={styles.wrapper_mine}>
                                            <div className={styles.message}>
                                                <div className={styles.content}>
                                                    {message.message}
                                                </div>
                                                <div className={styles.imgWrapper}>
                                                    <img src={message.avatar} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={styles.wrapper}>
                                            <div className={styles.message}>
                                                <div className={styles.imgWrapper}>
                                                    <img src={message.avatar} />
                                                </div>
                                                <div className={styles.content}>
                                                    {message.message}
                                                </div>
                                            </div>
                                        </div>
                                }
                            </>
                        )
                    })
                }
            </div>
            <div className={styles.send}>
                <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        handleSendMessage()
                }} />
                <div className={styles.sendBtn} onClick={() => handleSendMessage()}>
                    Send
                </div>
            </div>
        </div>
    )
}

export default ChatBoard