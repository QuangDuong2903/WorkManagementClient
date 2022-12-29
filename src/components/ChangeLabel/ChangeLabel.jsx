import styles from './ChangeLabel.module.scss'
import {
    DONE_STATUS_COLOR, STUCK_STATUS_COLOR, WORKING_ON_IT_STATUS_COLOR,
    CRITICAL_PRIORITY_COLOR, HIGH_PRIORITY_COLOR,
    MEDIUM_PRIORITY_COLOR, LOW_PRIORITY_COLOR
} from '../../constant/color'

const ChangeLabel = ({ type, current, handleChange }) => {

    const element = (() => {
        switch (type) {
            case 'Status':
                return (
                    <div className={styles.container}>
                        <div className={current == 'Done' ? styles.label_selected : styles.label} style={{ backgroundColor: DONE_STATUS_COLOR }} onClick={() => handleChange('Done')}>
                            Done
                        </div>
                        <div className={current == 'Working on it' ? styles.label_selected : styles.label} style={{ backgroundColor: WORKING_ON_IT_STATUS_COLOR }} onClick={() => handleChange('Working on it')}>
                            Working on it
                        </div>
                        <div className={current == 'Stuck' ? styles.label_selected : styles.label} style={{ backgroundColor: STUCK_STATUS_COLOR }} onClick={() => handleChange('Stuck')}>
                            Stuck
                        </div>
                    </div>
                )
            case 'Priority':
                return (
                    <div className={styles.container}>
                        <div className={current == 1 ? styles.label_selected : styles.label} style={{ backgroundColor: CRITICAL_PRIORITY_COLOR }} onClick={() => handleChange(1)}>
                            Critical
                        </div>
                        <div className={current == 2 ? styles.label_selected : styles.label} style={{ backgroundColor: HIGH_PRIORITY_COLOR }} onClick={() => handleChange(2)}>
                            High
                        </div>
                        <div className={current == 3 ? styles.label_selected : styles.label} style={{ backgroundColor: MEDIUM_PRIORITY_COLOR }} onClick={() => handleChange(3)}>
                            Medium
                        </div>
                        <div className={current == 4 ? styles.label_selected : styles.label} style={{ backgroundColor: LOW_PRIORITY_COLOR }} onClick={() => handleChange(4)}>
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