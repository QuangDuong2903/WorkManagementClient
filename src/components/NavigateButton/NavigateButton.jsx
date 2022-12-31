import styles from './NavigateButton.module.scss'

import HOME_PAGE_ICON from '../../assets/icons/monday_logo_icon.png'
import {
    MdOutlineWorkOutline, MdNotifications, MdAllInbox, MdFactCheck, MdStarBorder,
    MdOutlineAppSettingsAlt, MdGroupAdd, MdOutlineSearch, MdExitToApp
} from "react-icons/md"
import { AiOutlineQuestionCircle } from "react-icons/ai"
const NavigateButton = ({ type, isSelected, onClick, count }) => {

    const element = (() => {
        switch (type) {
            case 'Home':
                return (
                    <div className={isSelected ? styles.imgWrapper_selected : styles.imgWrapper}>
                        <img src={HOME_PAGE_ICON} />
                    </div>
                )
            case 'Workspace': return (
                <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                    <MdOutlineWorkOutline color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            )
            case 'Notifications':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdNotifications color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Inbox':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdAllInbox color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'MyWork':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdFactCheck color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Favorite':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdStarBorder color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Apps':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdOutlineAppSettingsAlt color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Invite':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdGroupAdd color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Search':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdOutlineSearch color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Help':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <AiOutlineQuestionCircle color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
            case 'Logout':
                return (
                    <div className={isSelected ? styles.iconWrapper_selected : styles.iconWrapper}>
                        <MdExitToApp color='white' style={{ 'width': '100%', 'height': '100%' }} />
                    </div>
                )
        }
    })()

    return (
        <div className={styles.container} onClick={onClick}>
            {element}
            {
                count > 0 &&
                <div className={styles.count}>
                    {count}
                </div>
            }
            <div className={styles.pop_up_message}>
                {type}
            </div>
        </div>
    )
}

export default NavigateButton