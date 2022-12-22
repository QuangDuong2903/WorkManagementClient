import styles from './Group.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdTrash } from 'react-icons/io'
import Task from '../Task/Task'
import { SwatchesPicker } from 'react-color'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateGroup, deleteGroup } from '../../app/reducers/groupReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'

const Group = ({ data }) => {

    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)
    const id = data.id

    const [name, setName] = useState(data.name)
    const [isEditName, setIsEditName] = useState(false)
    const [color, setColor] = useState(data.color)
    const [isEditColor, setIsEditColor] = useState(false)

    const handleUpdateGroupName = () => {
        setIsEditName(!isEditName)
        const data = { name }
        dispatch(updateGroup({ accessToken, id, data }))
    }

    const handleUpdateColor = (color) => {
        setColor(color.hex)
        const data = { color: color.hex }
        dispatch(updateGroup({ accessToken, id, data }))
    }

    const handleDeleteGroup = () => {
        dispatch(deleteGroup({ accessToken, id }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.name} style={{ color: `${color}` }}>
                    <MdKeyboardArrowDown />
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
                <IoMdTrash style={{ fontSize: '15px', margin: '0 10px', cursor: 'pointer' }}
                    color='grey'
                    onClick={() => handleDeleteGroup()}
                />
            </div>

            <div className={styles.table} style={{ borderLeft: `10px solid ${color}` }}>
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
                            <Task key={task.id} data={task} />
                        )
                    })
                }
                <div className={styles.add}>
                    <AiOutlinePlus />
                    Add Task
                </div>
            </div>
        </div>
    )
}

export default Group