import styles from './PriorityLabel.module.scss'

const PriorityLabel = ({ type }) => {

    const content = (() => {
        switch (type) {
            case 1:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#da2727' }}>
                        Critical
                    </div>
                )
            case 2:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#1605b6' }}>
                        High
                    </div>
                )
            case 3:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#066fcb' }}>
                        Medium
                    </div>
                )
            case 4:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#55c8ff' }}>
                        Low
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

export default PriorityLabel