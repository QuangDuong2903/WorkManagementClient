import styles from './Notification.module.scss'
import { SlOptions } from 'react-icons/sl'
import { MdDone } from 'react-icons/md'
import { Typography, IconButton, Avatar, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from 'moment/moment'
import { getNotification, selectNotificationData, selectNotificationStatus, setReadNotification } from '../../app/reducers/notificationReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { useEffect } from 'react'
import axios from 'axios'
import { BOARD_API } from '../../constant/apiURL'
import { getBoardData } from '../../app/reducers/boardReducer'

const Notification = ({ isOpen, handleClose }) => {

    const dispatch = useDispatch()
    const status = useSelector(selectNotificationStatus)
    const data = useSelector(selectNotificationData)
    const accessToken = useSelector(selectUserAccessToken)

    const [tab, setTab] = useState('All')

    const handleSetRead = () => {
        let ids = []
        data.forEach(notification => {
            if (!notification.isRead)
                ids.push(notification.id)
        })
        if (ids.length > 0)
            dispatch(setReadNotification({ accessToken, ids }))
    }

    const handleAccept = async (id, notiId) => {
        try {
            await axios.put(`${BOARD_API}/${id}/notification/${notiId}/users`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            dispatch(getBoardData(accessToken))
            dispatch(getNotification(accessToken))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if ((tab == 'All' || tab == 'Unread') && status == 'succeeded' && isOpen == true)
            handleSetRead()
    }, [tab, status, isOpen])

    return (
        <div className={styles.container} style={{ visibility: isOpen ? 'inherit' : 'hidden' }}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Typography variant='h5'>Notifications</Typography>
                    <div className={styles.btn}>
                        <IconButton>
                            <SlOptions style={{ fontSize: '15px' }} />
                        </IconButton>
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{ fontSize: '18px' }} />
                        </IconButton>
                    </div>
                </div>
                <div className={styles.tabs}>
                    <div className={tab == 'All' ? styles.tab_selected : styles.tab}
                        onClick={() => setTab('All')}
                    >
                        All
                    </div>
                    <div className={tab == 'Unread' ? styles.tab_selected : styles.tab}
                        onClick={() => setTab('Unread')}
                    >
                        Unread
                    </div>
                    <div className={tab == 'I was mentioned' ? styles.tab_selected : styles.tab}
                        onClick={() => setTab('I was mentioned')}
                    >
                        I was mentioned
                    </div>
                    <div className={tab == 'Assigned to me' ? styles.tab_selected : styles.tab}
                        onClick={() => setTab('Assigned to me')}
                    >
                        Assigned to me
                    </div>
                </div>
                <div className={styles.line}>
                </div>
            </div>
            <div className={styles.notifications}>
                {
                    tab == 'All' && data && data.length > 0 && data.map(notification => {
                        return (
                            <div key={notification.id} className={styles.notification}>
                                <div className={styles.main}>
                                    <div className={styles.content}>
                                        <Avatar sx={{
                                            width: '45px',
                                            height: '45px'
                                        }} src={notification.thumbnail} />
                                        <div className={styles.message}>
                                            <Typography variant='h6' sx={{
                                                fontSize: '15px',
                                                fontWeight: '600'
                                            }}>
                                                {notification.createdBy}
                                            </Typography>
                                            <Typography variant='body1' sx={{
                                                fontSize: '11px'
                                            }}>
                                                {notification.message}
                                            </Typography>
                                        </div>
                                    </div>
                                    {
                                        notification.type == 1 &&
                                        <>
                                            {
                                                notification.isAccept == false ?
                                                    <div className={styles.btn}>
                                                        <Button
                                                        onClick={() => handleAccept(notification.boardId, notification.id)}
                                                            sx={{
                                                                width: '80px',
                                                                height: '30px',
                                                                fontSize: '10px',
                                                                margin: '0 10px'
                                                            }}
                                                            variant="contained" color="success">
                                                            Accecpt
                                                        </Button>
                                                        <Button sx={{
                                                            width: '80px',
                                                            height: '30px',
                                                            fontSize: '10px'
                                                        }} variant="outlined" color="error">
                                                            Decline
                                                        </Button>
                                                    </div>
                                                    :
                                                    <div className={styles.accepted}>
                                                        <MdDone />
                                                        Accepted
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                                <Typography variant='body1' sx={{
                                    fontSize: '11px',
                                    color: '#b1b5c5',
                                    margin: '10px 0'
                                }}>
                                    {moment(notification.createdDate).fromNow()}
                                </Typography>
                            </div>
                        )
                    })
                }
                {
                    tab == 'Unread' && data && data.length > 0 && data.filter(notification => !notification.isRead).map(notification => {
                        return (
                            <div key={notification.id} className={styles.notification}>
                                <div className={styles.main}>
                                    <div className={styles.content}>
                                        <Avatar sx={{
                                            width: '45px',
                                            height: '45px'
                                        }} src={notification.thumbnail} />
                                        <div className={styles.message}>
                                            <Typography variant='h6' sx={{
                                                fontSize: '15px',
                                                fontWeight: '600'
                                            }}>
                                                {notification.createdBy}
                                            </Typography>
                                            <Typography variant='body1' sx={{
                                                fontSize: '11px'
                                            }}>
                                                {notification.message}
                                            </Typography>
                                        </div>
                                    </div>
                                    {
                                        notification.type == 1 &&
                                        <>
                                            {
                                                notification.isAccept == false ?
                                                    <div className={styles.btn}>
                                                        <Button
                                                            onClick={() => handleAccept(notification.boardId, notification.id)}
                                                            sx={{
                                                                width: '80px',
                                                                height: '30px',
                                                                fontSize: '10px',
                                                                margin: '0 10px'
                                                            }}
                                                            variant="contained" color="success">
                                                            Accecpt
                                                        </Button>
                                                        <Button sx={{
                                                            width: '80px',
                                                            height: '30px',
                                                            fontSize: '10px'
                                                        }} variant="outlined" color="error">
                                                            Decline
                                                        </Button>
                                                    </div>
                                                    :
                                                    <div className={styles.accepted}>
                                                        <MdDone />
                                                        Accepted
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                                <Typography variant='body1' sx={{
                                    fontSize: '11px',
                                    color: '#b1b5c5',
                                    margin: '10px 0'
                                }}>
                                    {moment(notification.createdDate).fromNow()}
                                </Typography>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Notification