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

    useEffect(() => {
        let Sock = new SockJS(SOCKET_URL);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }, [])

    const onConnected = () => {
        stompClient.subscribe(`/chatroom/${id}`, (message) => {
            console.log(message)
        })
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleSendMessage = () => {
        stompClient.send(`/app/message/${id}`, {}, `${user.displayName}:${message}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.users}>

            </div>
            <div className={styles.message}>

            </div>
            <div className={styles.send}>
                <input value={message} onChange={(e) => setMessage(e.target.value)}/>
                <div className={styles.sendBtn} onClick={() => handleSendMessage()}>
                    Send
                </div>
            </div>
        </div>
    )
}

export default ChatBoard