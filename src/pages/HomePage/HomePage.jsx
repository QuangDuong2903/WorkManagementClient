import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { selectUserStatus, selectUserAccessToken } from "../../app/reducers/userSlice"
import { getBoardData } from "../../app/reducers/boardReducer"
import { useDispatch, useSelector } from "react-redux"
import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { SOCKET_URL } from "../../constant/apiURL"
import { selectUserData } from "../../app/reducers/userSlice"

import styles from './HomePage.module.scss'

import SideBar from "../../components/SideBar/SideBar"

var stompClient = null
const HomePage = () => {

    const auth = getAuth()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const status = useSelector(selectUserStatus)

    const accessToken = useSelector(selectUserAccessToken)

    const user = useSelector(selectUserData)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user)
                navigate('/authentication')
        })
    }, [])

    useEffect(() => {
        if (status == 'succeeded') {
            let Sock = new SockJS(SOCKET_URL)
            stompClient = over(Sock)
            stompClient.connect({}, onConnected, onError)
            dispatch(getBoardData(accessToken))
        }
    }, [status])

    const onConnected = () => {
        stompClient.subscribe(`/notifications/${user.id}`, (payload) => handleReceiveMessage(payload.body))
        stompClient.send(`/app/join/notifications`, {}, JSON.stringify({
            id: user.id,
            name: user.displayName,
            email: user.email,
            avatar: user.avatar,
            type: 'JOIN'
        }))
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleReceiveMessage = (payload) => {
        const data = JSON.parse(payload)
        alert(data)
    }

    const handleSendMessage = () => {
        stompClient.send(`/app/send/notifications`, {}, 2)
    }

    return (
        <>
            <div className={styles.container}>
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}

export default HomePage