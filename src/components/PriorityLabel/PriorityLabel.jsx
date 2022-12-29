import styles from './PriorityLabel.module.scss'
import ChangeLabel from '../ChangeLabel/ChangeLabel'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateTaskInGroup } from '../../app/reducers/groupReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { CRITICAL_PRIORITY_COLOR, HIGH_PRIORITY_COLOR, MEDIUM_PRIORITY_COLOR, LOW_PRIORITY_COLOR } from '../../constant/color'

const PriorityLabel = ({ type, taskId }) => {

    const dispatch = useDispatch()
    const accessToken = useSelector(selectUserAccessToken)

    const [isEdit, setIsEdit] = useState(false)

    const handleChange = (priority) => {
        setIsEdit(false)
        const data = { priority }
        dispatch(updateTaskInGroup({ accessToken, id: taskId, data }))
    }

    const content = (() => {
        switch (type) {
            case 1:
                return (
                    <div className={styles.container} style={{ backgroundColor: CRITICAL_PRIORITY_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        Critical
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange} current={type} />}
                    </div>
                )
            case 2:
                return (
                    <div className={styles.container} style={{ backgroundColor: HIGH_PRIORITY_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        High
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange} current={type} />}
                    </div>
                )
            case 3:
                return (
                    <div className={styles.container} style={{ backgroundColor: MEDIUM_PRIORITY_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        Medium
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange} current={type} />}
                    </div>
                )
            case 4:
                return (
                    <div className={styles.container} style={{ backgroundColor: LOW_PRIORITY_COLOR }} onClick={() => setIsEdit(!isEdit)}>
                        Low
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange} current={type} />}
                    </div>
                )
        }
    })()

    return (
        <>
            {content}
        </>
    )
}

export default PriorityLabel