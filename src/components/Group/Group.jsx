import styles from './Group.module.scss'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Task from '../Task/Task'
import { SwatchesPicker } from 'react-color'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteIcon from '@mui/icons-material/Delete'
import Modal from 'react-modal'

import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { updateGroup, deleteGroup, createTaskInGroup } from '../../app/reducers/groupReducer'
import { selectUserAccessToken, selectUserId } from '../../app/reducers/userSlice'
import { IconButton } from '@mui/material'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

const Group = ({ data, keyword, handleNotify }) => {

    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)
    const userId = useSelector(selectUserId)
    const id = data.id

    const [name, setName] = useState(data.name)
    const [isEditName, setIsEditName] = useState(false)
    const [color, setColor] = useState(data.color)
    const [isEditColor, setIsEditColor] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '35%',
        }
    }

    const handleUpdateGroupName = () => {
        setIsEditName(!isEditName)
        const data = { name }
        dispatch(updateGroup({ accessToken, id, data }))
    }

    const handleUpdateColor = (color) => {
        setColor(color.hex)
        const data = { color: color.hex }
        dispatch(updateGroup({ accessToken, id, data }))
            .then(unwrapResult)
            .then(() => {
                handleNotify('Update group successfully', 'success')
            })
            .catch(() => {
                handleNotify('Update group failed', 'error')
            })
    }

    const handleDeleteGroup = () => {
        dispatch(deleteGroup({ accessToken, id }))
            .then(unwrapResult)
            .then(() => {
                handleNotify('Delete group successfully', 'success')
            })
            .catch(() => {
                handleNotify('Delete group failed', 'error')
            })
    }
    const handleCreateTask = () => {
        const data = {
            name: 'new task',
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            status: 'Working on it',
            priority: 3,
            groupId: id,
            userId: userId
        }
        dispatch(createTaskInGroup({ accessToken, data }))
            .then(unwrapResult)
            .then(() => {
                handleNotify('Create task successfully', 'success')
            })
            .catch(() => {
                handleNotify('Create task failed', 'error')
            })
    }

    return (
        <>
            {
                (name.includes(keyword) || keyword == '' || !keyword || data.tasks.find(task => task.name.includes(keyword))) &&
                <div className={styles.container} >
                    <div className={styles.header}>
                        <div className={styles.name} style={{ color: `${color}` }}>
                            {
                                isHidden ?
                                    <IconButton onClick={() => setIsHidden(false)}>
                                        <KeyboardArrowUpIcon sx={{ color: `${color}` }} />
                                    </IconButton>
                                    :
                                    <IconButton onClick={() => setIsHidden(true)}>
                                        <KeyboardArrowDownIcon sx={{ color: `${color}` }} />
                                    </IconButton>
                            }
                            <div className={styles.color} style={{ backgroundColor: `${color}` }}
                                onClick={() => setIsEditColor(!isEditColor)}
                            >
                                <div className={isEditColor ? styles.colorPickerVisible : styles.colorPicker}>
                                    <SwatchesPicker
                                        onChange={handleUpdateColor}
                                    />
                                </div>
                            </div>
                            {isEditName ? <input style={{ color: `${color}` }} onChange={e => setName(e.target.value)} value={name} onBlur={() => handleUpdateGroupName()} /> :
                                <span onClick={() => setIsEditName(!isEditName)}>{name}</span>}
                        </div>
                        <IconButton onClick={() => setIsOpenConfirm(true)}>
                            <DeleteIcon sx={{ fontSize: '15px' }} />
                        </IconButton>
                    </div>

                    {!isHidden &&
                        <div className={styles.table} style={{ borderLeft: `7px solid ${color}` }}>
                            <div className={styles.header}>
                                <div className={styles.taskName}>Item</div>
                                <div className={styles.taskInfo}>Person</div>
                                <div className={styles.taskInfo}>Status</div>
                                <div className={styles.taskInfo}>Start Date</div>
                                <div className={styles.taskInfo}>End Date</div>
                                <div className={styles.taskInfo}>Priority</div>
                            </div>
                            {
                                data && data.tasks && data.tasks.length > 0 && data.tasks.map(task => {
                                    return (
                                        <>
                                            {
                                                (name.includes(keyword) || task.name.includes(keyword)) &&
                                                <Task key={task.id} data={task} handleNotify={handleNotify} />
                                            }
                                        </>

                                    )
                                })
                            }
                            <div className={styles.add} onClick={() => handleCreateTask()}>
                                <AiOutlinePlus style={{ margin: '0 10px' }} />
                                Add Task
                            </div>
                        </div>
                    }
                    <Modal isOpen={isOpenConfirm} style={customStyles} ariaHideApp={false}>
                        <ConfirmModal name={name} handleClose={() => setIsOpenConfirm(false)} handleConfirm={handleDeleteGroup} />
                    </Modal>
                </div >
            }
        </>
    )
}

export default Group