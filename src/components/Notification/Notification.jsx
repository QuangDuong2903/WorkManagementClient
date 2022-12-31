import styles from './Notification.module.scss'
import { SlOptions } from 'react-icons/sl'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

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
                    <h2>Notifications</h2>
                    <div className={styles.btn}>
                        <div className={styles.btnWrapper}>
                            <SlOptions />
                        </div>
                        <div className={styles.btnWrapper} onClick={handleClose}>
                            <AiOutlineClose />
                        </div>
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
                                    <div className={styles.thumbnail}>
                                        <img src={notification.thumbnail} />
                                    </div>
                                    <div className={styles.message}>
                                        <h4>{notification.createdBy}</h4>
                                        <div className={styles.content}>
                                            {notification.message}
                                        </div>
                                    </div>
                                    {
                                        notification.type == 1 &&
                                        <>
                                            {
                                                notification.isAccept == false ?
                                                    <div className={styles.btn}>
                                                        <div className={styles.accept} onClick={() => handleAccept(notification.boardId, notification.id)}>
                                                            Accept
                                                        </div>
                                                        <div className={styles.decline}>
                                                            Decline
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className={styles.accepted}>
                                                        <MdDone/>
                                                        Accepted
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                                <div className={styles.time}>
                                    {moment(notification.createdDate).fromNow()}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    tab == 'Unread' && data && data.length > 0 && data.filter(notification => !notification.isRead).map(notification => {
                        return (
                            <div key={notification.id} className={styles.notification}>
                                <div className={styles.main}>
                                    <div className={styles.thumbnail}>
                                        <img src={notification.thumbnail} />
                                    </div>
                                    <div className={styles.message}>
                                        <h4>{notification.createdBy}</h4>
                                        <div className={styles.content}>
                                            {notification.message}
                                        </div>
                                    </div>
                                    {
                                        notification.type == 1 &&
                                        <>
                                            {
                                                notification.isAccept == false ?
                                                    <div className={styles.btn}>
                                                        <div className={styles.accept} onClick={() => handleAccept(notification.boardId, notification.id)}>
                                                            Accept
                                                        </div>
                                                        <div className={styles.decline}>
                                                            Decline
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className={styles.accepted}>
                                                        <MdDone/>
                                                        Accepted
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                                <div className={styles.time}>
                                    {moment(notification.createdDate).fromNow()}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Notification