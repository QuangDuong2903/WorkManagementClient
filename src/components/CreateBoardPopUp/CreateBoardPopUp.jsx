import styles from './CreateBoardPopUp.module.scss'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const CreateBoardPopUp = ({ handleCancel, handleCreate }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.title}>Create Board</div>
            <TextField
                size='small'
                margin="normal"
                label='Board name'
                fullWidth
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                size='small'
                margin="normal"
                label='Board description'
                fullWidth
                value={name}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.modalBtn}>
                <Button sx={{margin: '0 20px'}} size='small' variant="outlined" onClick={() => handleCancel()}>Cancel</Button>
                <Button size='small' variant="contained" onClick={() => handleCreate(name, description)}>Create Board</Button>
            </div>
        </div>
    )
}

export default CreateBoardPopUp