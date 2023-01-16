import { useNavigate, Outlet } from "react-router-dom"
import { useEffect, useLayoutEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { selectUserStatus, selectUserAccessToken, selectUserData, getUserData } from "../../app/reducers/userSlice"
import { getBoardData } from "../../app/reducers/boardReducer"
import { getNotification, receiveNotification } from "../../app/reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { SOCKET_URL } from "../../constant/apiURL"

import styles from './HomePage.module.scss'

import SideBar from "../../components/SideBar/SideBar"

var stompClient = null

const HomePage = () => {

    var subscription
    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const status = useSelector(selectUserStatus)
    const accessToken = useSelector(selectUserAccessToken)
    const user = useSelector(selectUserData)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const data = {
                    userName: user.email,
                    type: 2,
                    givenName: user.displayName.substring(0, user.displayName.indexOf(' ')),
                    familyName: user.displayName.substring(user.displayName.indexOf(' ') + 1),
                    displayName: user.displayName,
                    avatar: user.photoURL,
                    email: user.email,
                    status: 1
                }
                dispatch(getUserData(data))
            } else
                navigate('/authentication')
        })
    }, [])

    useLayoutEffect(() => {
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (status == 'succeeded') {
            dispatch(getBoardData(accessToken))
            dispatch(getNotification(accessToken))
            let Sock = new SockJS(SOCKET_URL)
            stompClient = over(Sock)
            stompClient.connect({}, onConnected, onError)
        }
    }, [status])

    const onConnected = () => {
        subscription = stompClient.subscribe(`/notifications/${user.id}`, (payload) => handleReceiveMessage(payload.body))
        stompClient.send(`/app/join/notifications`, {}, JSON.stringify({
            id: user.id,
            name: user.displayName,
            email: user.email,
            avatar: user.avatar,
            type: 'JOIN'
        }))
    }

    const onError = (err) => {
        console.log(err)
    }

    const handleReceiveMessage = (payload) => {
        const data = JSON.parse(payload)
        dispatch(receiveNotification(data))
    }

    return (
        <div className={styles.container}>
            <SideBar />
            <Outlet />
        </div>
    )
}

export default HomePage