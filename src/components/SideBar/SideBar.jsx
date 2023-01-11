import styles from './SideBar.module.scss'

import { useState, useEffect } from 'react'

import { getAuth, signOut } from "firebase/auth"

import NavigateButton from '../NavigateButton/NavigateButton'
import Notification from '../Notification/Notification'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBoardData, selectBoardStatus } from '../../app/reducers/boardReducer'
import { selectUserData } from '../../app/reducers/userSlice'
import { selectNewNotificationCount } from '../../app/reducers/notificationReducer'

const SideBar = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const auth = getAuth()

    const status = useSelector(selectBoardStatus)

    const count = useSelector(selectNewNotificationCount)

    const boardData = useSelector(selectBoardData)

    const userData = useSelector(selectUserData)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    const [tab, setTab] = useState('')
    const [isOpenNotification, setIsOpenNotification] = useState(false)

    useEffect(() => {
        setTab(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    }, [location])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.group}>
                    <NavigateButton type='Home' isSelected={tab === ''} onClick={() => navigate('/')} />
                    <div className={styles.line}></div>
                    <NavigateButton type='Workspace' isSelected={location.pathname.includes('board')} onClick={() => navigate((status == 'succeeded' && boardData.length > 0) ? `/board/${boardData[0].id}` : '/board')} />
                    <NavigateButton type='Notifications' onClick={() => setIsOpenNotification(!isOpenNotification)}
                        count={count}
                    />
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
                        <img src={userData ? userData.avatar : ''} alt="" />
                    </div>
                    <NavigateButton type='Logout' onClick={() => handleSignOut()} />
                </div>
                <Notification isOpen={isOpenNotification} handleClose={() => setIsOpenNotification(false)} />
            </div>

        </>
    )
}

export default SideBar