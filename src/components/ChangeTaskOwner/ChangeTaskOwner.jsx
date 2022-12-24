import styles from './ChangeTaskOwner.module.scss'

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { updateTaskInGroup } from '../../app/reducers/groupReducer'
import { useEffect } from 'react'
import axios from 'axios'

import { BOARD_API } from '../../constant/apiURL'

const ChangeTaskOwner = ({ id }) => {

    const location = useLocation()
    const boardId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${BOARD_API}/${boardId}/users`, {
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

    const handleUpdate = (userId) => {
        const data = { userId }
        dispatch(updateTaskInGroup({ accessToken, id, data }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {
                    users && users.length > 0 && users.map(user => {
                        return (
                            <div key={user.id} className={styles.user} onClick={() => handleUpdate(user.id)}>
                                <div className={styles.imgWrapper}>
                                    <img src={user.avatar} />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.name}>{user.displayName}</div>
                                    <div className={styles.email}>{user.email}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChangeTaskOwner