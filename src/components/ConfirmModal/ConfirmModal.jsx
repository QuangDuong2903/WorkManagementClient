import styles from './ConfirmModal.module.scss'
import { Typography, IconButton, Alert, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ConfirmModal = ({ handleClose, handleConfirm, name }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography variant='h6' sx={{ fontWeight: '600' }}>
                    Delete Confirmation
                </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon sx={{ fontSize: '15px' }} />
                </IconButton>
            </div>
            <Alert severity="error" sx={{ margin: '10px 0' }}>Are you sure you want to delete '{name}' ?</Alert>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '20px 0 0 0'
            }}>
                <Button variant="outlined" color="error" sx={{ fontSize: '12px', margin: '0 10px' }} onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" sx={{ fontSize: '12px' }} onClick={handleConfirm}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ConfirmModal