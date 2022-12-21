import styles from './StatusLabel.module.scss'
import ChangeLabel from '../ChangeLabel/ChangeLabel';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { updateTaskInGroup } from '../../app/reducers/groupReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'

const StatusLabel = ({ type, taskId }) => {

    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)

    const [isEdit, setIsEdit] = useState(false)

    const handleChange = (status) => {
        setIsEdit(false)
        const data = { status }
        dispatch(updateTaskInGroup({ accessToken, id: taskId, data }))
    }

    const content = (() => {
        switch (type) {
            case 'Done':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#3ac23a' }} onClick={() => setIsEdit(!isEdit)}>
                        Done
                        {isEdit && <ChangeLabel type={'Status'} handleChange={handleChange} />}
                    </div>
                )
            case 'Working on it':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#ff9800' }} onClick={() => setIsEdit(!isEdit)}>
                        Working on it
                        {isEdit && <ChangeLabel type={'Status'} handleChange={handleChange} />}
                    </div>
                )
            case 'Stuck':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#c90303' }} onClick={() => setIsEdit(!isEdit)}>
                        Stuck
                        {isEdit && <ChangeLabel type={'Status'} handleChange={handleChange} />}
                    </div>
                )
        }
    })();

    return (
        <>
            {content}
        </>
    )
}

export default StatusLabel