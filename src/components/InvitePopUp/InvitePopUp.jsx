import styles from './InvitePopUp.module.scss'
import { AiOutlineClose } from 'react-icons/ai'

import { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GoPerson } from 'react-icons/go'
import { HiEnvelope } from 'react-icons/hi2'
import { BOARD_API, USER_API } from '../../constant/apiURL'
import { sendInvitation } from '../../app/reducers/notificationReducer'

const InvitePopUp = ({ handleClose, data }) => {

    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)
    const location = useLocation()
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

    const [users, setUsers] = useState([])
    const [results, setResults] = useState([])
    const [key, setKey] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${BOARD_API}/${id}/users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setUsers(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])

    useEffect(() => {
        const getResults = async () => {
            try {
                const res = await axios.get(USER_API, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        key
                    }
                })
                setResults(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getResults()
    }, [key])

    const handleInvite = (userId) => {
        const ids = []
        ids.push(parseInt(userId))
        dispatch(sendInvitation({ accessToken, boardId: id, ids }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Board Members</h2>
                <div className={styles.close}>
                    <AiOutlineClose onClick={handleClose} cursor='pointer' />
                </div>
            </div>
            <div className={styles.search}>
                <input placeholder='Enter name or email' value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <div className={styles.result}>
                    {
                        results && results.length > 0 &&
                        results.map(user => {
                            return (
                                <div key={user.id} className={styles.user}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.imgWrapper}>
                                            <img src={user.avatar} />
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.name}>{user.displayName}</div>
                                            <div className={styles.email}>{user.email}</div>
                                        </div>
                                    </div>
                                    {
                                        users.find(el => el.id == user.id) ?
                                            <GoPerson />
                                            :
                                            <div className={styles.invite} onClick={() => handleInvite(user.id)}>
                                                <div><HiEnvelope /></div>
                                                Invite
                                            </div>
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        results && results.length == 0 &&
                        <div style={{ margin: '0 auto', width: '80px' }}>Not found</div>
                    }
                </div>
            </div>
            <div className={styles.list}>
                {
                    users && users.length > 0 && users.map(user => {
                        return (
                            <div key={user.id} className={styles.user}>
                                <div className={styles.userInfo}>
                                    <div className={styles.imgWrapper}>
                                        <img src={user.avatar} />
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.name}>{user.displayName}</div>
                                        <div className={styles.email}>{user.email}</div>
                                    </div>
                                </div>
                                {
                                    data.owner == user.id &&
                                    <div className={styles.admin}>
                                        Admin
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default InvitePopUp