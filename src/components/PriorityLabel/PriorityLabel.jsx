import styles from './PriorityLabel.module.scss'
import ChangeLabel from '../ChangeLabel/ChangeLabel'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateTaskInGroup } from '../../app/reducers/groupReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'

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
                    <div className={styles.container} style={{ backgroundColor: '#da2727' }} onClick={() => setIsEdit(!isEdit)}>
                        Critical
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange}/>}
                    </div>
                )
            case 2:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#1605b6' }} onClick={() => setIsEdit(!isEdit)}>
                        High
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange}/>}
                    </div>
                )
            case 3:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#066fcb' }} onClick={() => setIsEdit(!isEdit)}>
                        Medium
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange}/>}
                    </div>
                )
            case 4:
                return (
                    <div className={styles.container} style={{ backgroundColor: '#55c8ff' }} onClick={() => setIsEdit(!isEdit)}>
                        Low
                        {isEdit && <ChangeLabel type={'Priority'} handleChange={handleChange}/>}
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

export default PriorityLabel