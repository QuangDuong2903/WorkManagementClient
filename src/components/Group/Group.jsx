import styles from './Group.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import Task from '../Task/Task'

const data = {
    name: 'gr 1',
    color: '#00a298ff',
    tasks: [
        {
            name: 'task 1',
            startDate: '2022-12-17T15:00:00',
            endDate: '2022-12-27T15:00:00',
            status: 'Done',
            priority: 1,
            userAvatar: 'https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c'
        },
        {
            name: 'task 2',
            startDate: '2022-12-17T15:00:00',
            endDate: '2022-12-27T15:00:00',
            status: 'Working on it',
            priority: 2,
            userAvatar: 'https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c'
        },
        {
            name: 'task 3',
            startDate: '2022-12-17T15:00:00',
            endDate: '2022-12-27T15:00:00',
            status: 'Stuck',
            priority: 3,
            userAvatar: 'https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c'
        },
        {
            name: 'task 4',
            startDate: '2022-12-17T15:00:00',
            endDate: '2022-12-27T15:00:00',
            status: 'Done',
            priority: 4,
            userAvatar: 'https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c'
        },
    ]
}

const Group = () => {
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