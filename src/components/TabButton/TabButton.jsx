import styles from './TabButton.module.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { MdDashboard } from 'react-icons/md'

const TabButton = ({ type, isSelected, onClick }) => {

    return (
        <div className={isSelected ? styles.container_selected : styles.container} onClick={onClick}>
            {
                type == 'main' &&
                <div className={styles.wrapper}>
                    <GrHomeRounded style={{ marginRight: '10px' }} />
                    <span>Main Table</span>
                </div>
            }
            {
                type == 'dashboard' &&
                <div className={styles.wrapper}>
                    <MdDashboard style={{ marginRight: '10px' }} />
                    <span>Dashboard</span>
                </div>
            }
        </div>
    )
}

export default TabButton