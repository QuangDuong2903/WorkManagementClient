import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import axios from "axios"

import styles from './HomePage.module.scss'

import SideBar from "../../components/SideBar/SideBar"

const HomePage = () => {

    const auth = getAuth()

    const navigate = useNavigate()

    const fecthData = async () => {
        const res = await axios.get('http://localhost:8081/test')
        console.log(res.data)
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            fecthData()
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