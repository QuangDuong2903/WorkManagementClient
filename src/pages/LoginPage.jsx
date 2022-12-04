import signInWithGoogle from "../firebase/signInWithGoogle"

import { useEffect } from "react"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

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
        <>
            <button onClick={() => signInWithGoogle()}>Login with Google</button>
            <button>Login with Facebook</button>
        </>
    )
}

export default LoginPage