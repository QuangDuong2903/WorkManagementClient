import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import axios from "axios"

import styles from './HomePage.module.scss'

import SideBar from "../../components/SideBar/SideBar"

const HomePage = () => {

    const auth = getAuth()

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                console.log('not authentication')
                navigate('/authentication')
            } else console.log(user)
        })

    }, [])

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