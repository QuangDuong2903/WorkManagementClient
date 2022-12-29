import styles from './ChatBoard.module.scss'

import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { useEffect, useLayoutEffect } from 'react'
import { SOCKET_URL } from '../../constant/apiURL';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../app/reducers/userSlice';

var stompClient = null
const ChatBoard = ({ id }) => {

    var subscription
    const user = useSelector(selectUserData)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const messagesEndRef = useRef(null)

    useLayoutEffect(() => {
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        let Sock = new SockJS(SOCKET_URL)
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }, [])

    const onConnected = () => {
        subscription = stompClient.subscribe(`/chatroom/${id}`, (payload) => handleReceiveMessage(payload.body))
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
        switch (data.type) {
            case 'SEND':
                messages.push(data)
                setMessages([...messages])
                break;
            case 'JOIN':
                users.push(data)
                setUsers([...users])
                break;
            case 'LEAVE':
                let currentUsers = users
                currentUsers = currentUsers.filter(user => user.id != data.id)
                setUsers(currentUsers)
                break;
        }
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

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        console.log(messagesEndRef)
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 777);
    }

    return (
        <div className={styles.container}>
            <div className={styles.users}>
                Online Users:
                {
                    users && users.map(element => {
                        return (
                            <>
                                {user.id != element.id &&
                                    <div className={styles.imgWrapper}>
                                        <img src={element.avatar} />
                                    </div>
                                }
                            </>

                        )
                    })
                }
            </div>
            <div className={styles.messages} ref={messagesEndRef}>
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