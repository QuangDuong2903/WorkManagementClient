import styles from './TabButton.module.scss'
import PopUpMessage from '../PopUpMessage/PopUpMessage'
import { GrHomeRounded } from 'react-icons/gr'
import { MdDashboard, MdOutlineChat } from 'react-icons/md'
import { useState } from 'react'

const TabButton = ({ type, isSelected, onClick }) => {

    const [isHover, setIsHover] = useState(false)
    let message

    const content = (() => {
        switch (type) {
            case 'main':
                message = 'Main Table'
                return (
                    <div className={styles.wrapper}>
                        <GrHomeRounded style={{ marginRight: '10px' }} />
                        <span>Main Table</span>
                    </div>
                )
            case 'dashboard':
                message = 'Dashboard'
                return (
                    <div className={styles.wrapper}>
                        <MdDashboard style={{ marginRight: '10px' }} />
                        <span>Dashboard</span>
                    </div>
                )
            case 'chat':
                message = 'Chat'
                return (
                    <div className={styles.wrapper}>
                        <MdOutlineChat style={{ marginRight: '10px' }} />
                        <span>Chat</span>
                    </div>
                )
        }
    })();

    return (
        <div className={isSelected ? styles.container_selected : styles.container}
            onClick={onClick}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
        >
            {content}
            <PopUpMessage visibility={isHover} message={message}/>
        </div>
    )
}

export default TabButton