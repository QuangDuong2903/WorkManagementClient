import styles from './StatusLabel.module.scss'

const StatusLabel = ({ type }) => {

    let color = ''
    switch (type) {
        case 'Done':
            color = '#3ac23a'
            break;
        case 'Working on it':
            color = '#ff9800'
            break;
        case 'Stuck':
            color = '#c90303'
            break;
    }

    return (
        <div className={styles.container} style={{backgroundColor: `${color}`}}>
            {type}
        </div>
    )
}

export default StatusLabel