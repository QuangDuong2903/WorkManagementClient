import styles from './Group.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import Task from '../Task/Task'
import { SwatchesPicker } from 'react-color'

import { useState } from 'react'

const Group = ({ data }) => {

    const [name, setName] = useState(data.name)
    const [isEditName, setIsEditName] = useState(false)
    const [color, setColor] = useState(data.color)
    const [isEditColor, setIsEditColor] = useState(false)

    const handleUpdateGroupName = () => {
        setIsEditName(!isEditName)
    }

    const handleUpdateColor = (color) => {
        setColor(color.hex)
    }

    return (
        <div className={styles.container}>
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
                            <Task key={task.name} data={task} />
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