import styles from './Group.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import Task from '../Task/Task'

const Group = ({ data }) => {

    return (
        <div className={styles.container}>
            <div className={styles.name} style={{ color: `${data.color}` }}>
                <MdKeyboardArrowDown />
                {data.name}
            </div>
            <div className={styles.table} style={{ borderLeft: `10px solid ${data.color}` }}>
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