import styles from './StatusLabel.module.scss'
import ChangeLabel from '../ChangeLabel/ChangeLabel';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { updateTaskInGroup } from '../../app/reducers/groupReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { DONE_STATUS_COLOR, STUCK_STATUS_COLOR, WORKING_ON_IT_STATUS_COLOR } from '../../constant/color'

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
                    <div className={styles.container} style={{ backgroundColor: DONE_STATUS_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        Done
                        {taskId && isEdit && <ChangeLabel type={'Status'} handleChange={handleChange} current={type} />}
                    </div>
                )
            case 'Working on it':
                return (
                    <div className={styles.container} style={{ backgroundColor: WORKING_ON_IT_STATUS_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        Working on it
                        {taskId && isEdit && <ChangeLabel type={'Status'} handleChange={handleChange} current={type}/>}
                    </div>
                )
            case 'Stuck':
                return (
                    <div className={styles.container} style={{ backgroundColor: STUCK_STATUS_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        Stuck
                        {taskId && isEdit && <ChangeLabel type={'Status'} handleChange={handleChange} current={type}/>}
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