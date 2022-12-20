import styles from './PriorityLabel.module.scss'
import ChangeLabel from '../ChangeLabel/ChangeLabel';
import { useState } from 'react';

const PriorityLabel = ({ type }) => {

    const [isEdit, setIsEdit] = useState(false)

    const handleChange = (priority) => {
        // alert(priority)
        setIsEdit(false)
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