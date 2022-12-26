import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { selectUserStatus, selectUserAccessToken } from "../../app/reducers/userSlice"
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
            if (!user)
                navigate('/authentication')
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