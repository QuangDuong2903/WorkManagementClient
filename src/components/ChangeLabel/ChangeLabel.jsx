import styles from './ChangeLabel.module.scss'

const ChangeLabel = ({ type, handleChange }) => {

    const element = (() => {
        switch (type) {
            case 'Status':
                return (
                    <div className={styles.container}>
                        <div className={styles.label} style={{ backgroundColor: '#3ac23a' }} onClick={() => handleChange('Done')}>
                            Done
                        </div>
                        <div className={styles.label} style={{ backgroundColor: '#ff9800' }} onClick={() => handleChange('Working on it')}>
                            Working on it
                        </div>
                        <div className={styles.label} style={{ backgroundColor: '#c90303' }} onClick={() => handleChange('Stuck')}>
                            Stuck
                        </div>
                    </div>
                )
            case 'Priority':
                return (
                    <div className={styles.container}>
                        <div className={styles.label} style={{ backgroundColor: '#da2727' }} onClick={() => handleChange(1)}>
                            Critical
                        </div>
                        <div className={styles.label} style={{ backgroundColor: '#1605b6' }} onClick={() => handleChange(2)}>
                            High
                        </div>
                        <div className={styles.label} style={{ backgroundColor: '#066fcb' }} onClick={() => handleChange(3)}>
                            Medium
                        </div>
                        <div className={styles.label} style={{ backgroundColor: '#55c8ff' }} onClick={() => handleChange(4)}>
                            Low
                        </div>
                    </div>
                )
        }
    })();

    return (
        <>
            {element}
        </>
    )
}

export default ChangeLabel