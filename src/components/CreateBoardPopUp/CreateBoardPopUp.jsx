import styles from './CreateBoardPopUp.module.scss'
import { useState } from 'react'

const CreateBoardPopUp = ({ handleCancel, handleCreate }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.title}>Create Board</div>
            <div className={styles.name}>Board name:</div>
            <input type="text" className={styles.nameInput} value={name} onChange={e => setName(e.target.value)} />
            <div className={styles.description}>Board description:</div>
            <input type="text" className={styles.descriptionInput} value={description} onChange={e => setDescription(e.target.value)}/>
            <div className={styles.modalBtn}>
                <div className={styles.btnCancel} onClick={() => handleCancel()}>Cancel</div>
                <div className={styles.btnOK} onClick={() => handleCreate(name, description)}>Create Board</div>
            </div>
        </div>
    )
}

export default CreateBoardPopUp