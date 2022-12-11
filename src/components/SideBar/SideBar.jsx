import styles from './SideBar.module.scss'

import { useState, useEffect } from 'react'

import { getAuth, signOut } from "firebase/auth"

import NavigateButton from '../NavigateButton/NavigateButton'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBoardData } from '../../app/reducers/boardReducer'

const SideBar = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const auth = getAuth()

    const firstBoardId = useSelector(selectBoardData)[0].id

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    const [tab, setTab] = useState("")

    useEffect(() => {
        setTab(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    }, [location])

    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <NavigateButton type='Home' isSelected={tab === ''} onClick={() => navigate('/')} />
                <div className={styles.line}></div>
                <NavigateButton type='Workspace' isSelected={tab === 'broad'} onClick={() => navigate(`/board/${firstBoardId}`)} />
                <NavigateButton type='Notifications' />
                <NavigateButton type='Inbox' />
                <NavigateButton type='MyWork' />
                <NavigateButton type='Favorite' />
            </div>
            <div className={styles.group}>
                <NavigateButton type='Apps' />
                <NavigateButton type='Invite' />
                <NavigateButton type='Search' />
                <NavigateButton type='Help' />
                <div className={styles.line}></div>
                <div className={styles.userAvatar}>
                    <img src="https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c" alt="" />
                </div>
                <NavigateButton type='Logout' onClick={() => handleSignOut()}/>
            </div>
        </div>
    )
}

export default SideBar