import React from 'react'
import styles from './Task.module.scss'
import moment from 'moment'
import StatusLabel from '../StatusLabel/StatusLabel'
import PriorityLabel from '../PriorityLabel/PriorityLabel'
import ChangeTaskOwner from '../ChangeTaskOwner/ChangeTaskOwner'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { IoMdTrash } from 'react-icons/io'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskInGroup, deleteTaskInGroup } from '../../app/reducers/groupReducer';
import { selectUserAccessToken } from '../../app/reducers/userSlice'

import { useState } from 'react'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const Task = ({ data }) => {

    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)
    const id = data.id

    const [name, setName] = useState(data.name)
    const [isEditName, setIsEditName] = useState(false)

    const [startDate, setStartDate] = useState(moment(data.startDate))
    const [isEditStartDate, setIsEditStartDate] = useState(false)

    const [endDate, setEndDate] = useState(moment(data.endDate))
    const [isEditEndDate, setIsEditEndDate] = useState(false)

    const [isEditOwner, setIsEditOwner] = useState(false)
    const [isHover, setIsHover] = useState(false)

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [isOpenToastify, setIsOpenToastify] = useState(false)

    const handleChangeName = () => {
        const data = { name }
        setIsEditName(false)
        dispatch(updateTaskInGroup({ accessToken, id, data }))
            .then(unwrapResult)
            .then(() => {
                setMessage('Update task successfully')
                setType('success')
                setIsOpenToastify(true)
            })
            .catch(() => {
                setMessage('Update task error')
                setType('error')
                setIsOpenToastify(true)
            })
    }

    const handleChangeStartDate = (date) => {
        setStartDate(date)
    }

    const handleUpdateStartDate = () => {
        setIsEditStartDate(false)
        const data = { startDate: startDate.format('YYYY-MM-DDTHH:mm:ss') }
        dispatch(updateTaskInGroup({ accessToken, id, data }))
            .then(unwrapResult)
            .then(() => {
                setMessage('Update task successfully')
                setType('success')
                setIsOpenToastify(true)
            })
            .catch(() => {
                setMessage('Update task error')
                setType('error')
                setIsOpenToastify(true)
            })
    }

    const handleChangeEndDate = (date) => {
        setEndDate(date)
    }

    const handleUpdateEndDate = () => {
        setIsEditEndDate(false)
        const data = { endDate: endDate.format('YYYY-MM-DDTHH:mm:ss') }
        dispatch(updateTaskInGroup({ accessToken, id, data }))
            .then(unwrapResult)
            .then(() => {
                setMessage('Update task successfully')
                setType('success')
                setIsOpenToastify(true)
            })
            .catch(() => {
                setMessage('Update task error')
                setType('error')
                setIsOpenToastify(true)
            })
    }

    const handleDelete = () => {
        dispatch(deleteTaskInGroup({ accessToken, id }))
    }

    return (
        <div className={styles.container} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
            <div className={styles.taskName}>
                {isEditName ? <input value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => handleChangeName()}
                />
                    : <span onClick={() => setIsEditName(!isEditName)}>{name}</span>
                }
            </div>
            <div className={styles.taskInfo} onClick={() => setIsEditOwner(!isEditOwner)}>
                <div className={styles.imgWrapper}>
                    <img src={data.userAvatar} />
                </div>
                {isEditOwner && <ChangeTaskOwner id={data.id} />}
            </div>
            <div className={styles.taskInfo}>
                <StatusLabel type={data.status} taskId={data.id} />
            </div>
            <div className={styles.taskInfo}>
                {
                    isEditStartDate ?
                        <div style={{ width: '100%', height: '100%' }} onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                handleUpdateStartDate()
                        }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={startDate}
                                    onChange={handleChangeStartDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        : <span onClick={() => setIsEditStartDate(!isEditStartDate)}>{moment(startDate).format('ll')}</span>
                }
            </div>
            <div className={styles.taskInfo}>
                {
                    isEditEndDate ?
                        <div style={{ width: '100%', height: '100%' }} onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                handleUpdateEndDate()
                        }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={endDate}
                                    onChange={handleChangeEndDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        : <span onClick={() => setIsEditEndDate(!isEditEndDate)}>{moment(endDate).format('ll')}</span>
                }
            </div>
            <div className={styles.taskInfo}>
                <PriorityLabel type={data.priority} taskId={data.id} />
            </div>
            {isHover &&
                <div className={styles.delete} onClick={() => handleDelete()}>
                    <IoMdTrash />
                </div>
            }
            {/* <button onClick={() => {setMessage('Delete task successfully')
                setType('success')
                setIsOpenToastify(true)}}></button> */}
            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={isOpenToastify} autoHideDuration={500} onClose={() => setIsOpenToastify(false)}>
                <Alert onClose={() => setIsOpenToastify(false)} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Task