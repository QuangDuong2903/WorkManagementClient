import styles from './LoginPage.module.scss'

import signInWithGoogle from "../../firebase/signInWithGoogle"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'

const LoginPage = () => {

    const auth = getAuth()

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/')
            }
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png' />
                </div>
                <div className={styles.started}>
                    Get Started
                    <AiOutlineArrowRight />
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.title}>
                    <div>
                        A flatform built for a
                        <br />
                        new way of working
                    </div>
                </div>
                <div className={styles.login}>
                    <div className={styles.btn} onClick={() => signInWithGoogle()}>
                        <FcGoogle />
                        Login with Google
                    </div>
                    <div className={styles.btn}>
                        <BsFacebook color='blue' />
                        Login with Facebook
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage