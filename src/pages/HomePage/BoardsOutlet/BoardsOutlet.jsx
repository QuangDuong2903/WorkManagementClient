import styles from './BoardsOutlet.module.scss'

import { useState } from 'react'
import React from 'react'
import Navigator from '../../../components/Navigator/Navigator'
import BoardDetail from '../../../components/BoardDetail/BoardDetail'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const Broads = () => {

    const [broadWidth, setBroadWidth] = useState('97%')

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [isOpenToastify, setIsOpenToastify] = useState(false)

    const handleNotify = (message, type) => {
        setMessage(message)
        setType(type)
        setIsOpenToastify(true)
    }

    const handleClickNavigatior = (isOpenNav) => {
        if(isOpenNav)
            setBroadWidth('83%')
        else
            setBroadWidth('97%')
    }

    return (
       <div className={styles.container}>
            <Navigator handleClickNavigatior={handleClickNavigatior}/>
            <BoardDetail width={broadWidth} handleNotify={handleNotify}/>
            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={isOpenToastify} autoHideDuration={1000} onClose={() => setIsOpenToastify(false)}>
                <Alert onClose={() => setIsOpenToastify(false)} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
       </div>
    )
}

export default Broads