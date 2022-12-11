import styles from './BoardNavigateButton.module.scss'
import { FaClipboard } from 'react-icons/fa'

const BoardNavigateButton = ({ id, name, isSelected, onClick }) => {
    return (
        <>
            {
                isSelected ? 
                <div className={styles.container} onClick={onClick}>
                    <FaClipboard color='black' />
                    <div className={styles.name}>{name}</div>
                </div> 
                :
                <div className={styles.containerNotSelected} onClick={onClick}>
                    <FaClipboard color='black' />
                    <div className={styles.name}>{name}</div>
                </div>
            }
        </>
    )
}

export default BoardNavigateButton