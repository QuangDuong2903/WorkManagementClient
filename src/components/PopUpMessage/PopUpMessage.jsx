import styles from './PopUpMessage.module.scss'

const PopUpMessage = ({ message, visibility }) => {

    return (
        <>
            {
                visibility &&
                <div className={styles.container}>
                    {message}
                </div>
            }
        </>
    )
}

export default PopUpMessage