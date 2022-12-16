import styles from './Task.module.scss'
import moment from 'moment'

import StatusLabel from '../StatusLabel/StatusLabel'
import PriorityLabel from '../PriorityLabel/PriorityLabel'

const Task = ({data}) => {
    return (
        <div className={styles.container}>
            <div className={styles.taskName}>{data.name}</div>
            <div className={styles.taskInfo}>
                <div className={styles.imgWrapper}>
                    <img src={data.userAvatar}/>
                </div>
            </div>
            <div className={styles.taskInfo}>
                <StatusLabel type={data.status}/>
            </div>
            <div className={styles.taskInfo}>{moment(data.startDate).format('ll')}</div>
            <div className={styles.taskInfo}>{moment(data.endDate).format('ll')}</div>
            <div className={styles.taskInfo}>
                <PriorityLabel type={data.priority}/>
            </div>
        </div>
    )
}

export default Task