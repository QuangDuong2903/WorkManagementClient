import styles from './StatusLabel.module.scss'

const StatusLabel = ({ type }) => {

    const content = (() => {
        switch (type) {
            case 'Done':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#3ac23a' }}>
                        Done
                    </div>
                )
            case 'Working on it':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#ff9800' }}>
                        Working on it
                    </div>
                )
            case 'Stuck':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#c90303' }}>
                        Stuck
                    </div>
                )
        }
    })();

    return (
        <>
            {content}
        </>
    )
}

export default StatusLabel