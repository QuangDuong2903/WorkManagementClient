import './NavigateButton.scss'

import HOME_PAGE_ICON from '../../assets/icons/monday_logo_icon.png'
import { MdOutlineWorkOutline, MdNotifications, MdAllInbox, MdFactCheck, MdStarBorder, 
    MdOutlineAppSettingsAlt, MdGroupAdd, MdOutlineSearch, MdExitToApp  } from "react-icons/md"
import { AiOutlineQuestionCircle } from "react-icons/ai"
const NavigateButton = ({ type, isSelected, onClick }) => {

    const imgClassName = isSelected ? 'img-wrapper selected' : 'img-wrapper'
    const iconClassName = isSelected ? 'icon-wrapper selected' : 'icon-wrapper'

    return (
        <div className="naviagte-button-container" onClick={onClick}>
            {
                type == 'Home'
                &&
                <div className={imgClassName}>
                    <img src={HOME_PAGE_ICON} />
                </div>
            }
            {
                type == 'Workspace'
                &&
                <div className={iconClassName}>
                    <MdOutlineWorkOutline color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Notifications'
                &&
                <div className={iconClassName}>
                    <MdNotifications color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Inbox'
                &&
                <div className={iconClassName}>
                    <MdAllInbox color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>

            }
            {
                type == 'MyWork'
                &&
                <div className={iconClassName}>
                    <MdFactCheck color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>

            }
            {
                type == 'Favorite'
                &&
                <div className={iconClassName}>
                    <MdStarBorder color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Apps'
                &&
                <div className={iconClassName}>
                    <MdOutlineAppSettingsAlt color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Invite'
                &&
                <div className={iconClassName}>
                    <MdGroupAdd color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Search'
                &&
                <div className={iconClassName}>
                    <MdOutlineSearch color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Help'
                &&
                <div className={iconClassName}>
                    <AiOutlineQuestionCircle color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            {
                type == 'Logout'
                &&
                <div className={iconClassName}>
                    <MdExitToApp color='white' style={{ 'width': '100%', 'height': '100%' }} />
                </div>
            }
            <div className='pop-up-message'>
                {type}
            </div>
        </div>
    )
}

export default NavigateButton