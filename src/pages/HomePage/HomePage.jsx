import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getUserData, selectUserStatus, selectUserAccessToken } from "../../app/reducers/userSlice"
import { getBoardData } from "../../app/reducers/boardReducer"
import { useDispatch, useSelector } from "react-redux"

import styles from './HomePage.module.scss'

import SideBar from "../../components/SideBar/SideBar"

const HomePage = () => {

    const auth = getAuth()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const status = useSelector(selectUserStatus)

    const accessToken = useSelector(selectUserAccessToken)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                navigate('/authentication')
            } else {
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
                if (status == 'idle' || status == 'succeeded') {
                    console.log(status)
                    dispatch(getUserData(data))
                }
            }
        })
    }, [])

    useEffect(() => {
        if (status == 'succeeded')
            dispatch(getBoardData(accessToken))
    }, [status])

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