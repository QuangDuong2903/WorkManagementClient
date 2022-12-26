import styles from './TabButton.module.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { MdDashboard, MdOutlineChat } from 'react-icons/md'

const TabButton = ({ type, isSelected, onClick }) => {

    const content = (() => {
        switch (type) {
            case 'main':
                return (
                    <div className={styles.wrapper}>
                        <GrHomeRounded style={{ marginRight: '10px' }} />
                        <span>Main Table</span>
                    </div>
                )
            case 'dashboard':
                return (
                    <div className={styles.wrapper}>
                        <MdDashboard style={{ marginRight: '10px' }} />
                        <span>Dashboard</span>
                    </div>
                )
            case 'chat':
                return (
                    <div className={styles.wrapper}>
                        <MdOutlineChat style={{ marginRight: '10px' }} />
                        <span>Chat</span>
                    </div>
                )
        }
    })();

    return (
        <div className={isSelected ? styles.container_selected : styles.container} onClick={onClick}>
            {content}
        </div>
    )
}

export default TabButton