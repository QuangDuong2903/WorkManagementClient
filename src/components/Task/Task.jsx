import styles from './Task.module.scss'
import moment from 'moment'

import StatusLabel from '../StatusLabel/StatusLabel'
import PriorityLabel from '../PriorityLabel/PriorityLabel'
import ChangeTaskOwner from '../ChangeTaskOwner/ChangeTaskOwner'

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useDispatch, useSelector } from 'react-redux'
import { updateTaskInGroup } from '../../app/reducers/groupReducer';
import { selectUserAccessToken } from '../../app/reducers/userSlice'

import { useState } from 'react'

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

    const handleChangeName = () => {
        const data = { name }
        setIsEditName(false)
        dispatch(updateTaskInGroup({ accessToken, id, data }))
    }

    const handleChangeStartDate = (date) => {
        setStartDate(date)
    }

    const handleUpdateStartDate = () => {
        setIsEditStartDate(false)
        const data = { startDate: startDate.format('YYYY-MM-DDTHH:mm:ss') }
        dispatch(updateTaskInGroup({ accessToken, id, data }))
    }

    const handleChangeEndDate = (date) => {
        setEndDate(date)
    }

    const handleUpdateEndDate = () => {
        setIsEditEndDate(false)
        const data = { endDate: endDate.format('YYYY-MM-DDTHH:mm:ss') }
        dispatch(updateTaskInGroup({ accessToken, id, data }))
    }

    return (
        <div className={styles.container}>
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
                {isEditOwner && <ChangeTaskOwner id={data.id}/>}
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
        </div>
    )
}

export default Task