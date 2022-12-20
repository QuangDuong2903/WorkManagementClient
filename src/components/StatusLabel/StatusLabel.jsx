import styles from './StatusLabel.module.scss'
import ChangeLabel from '../ChangeLabel/ChangeLabel';
import { useState } from 'react';

const StatusLabel = ({ type }) => {

    const [isEdit, setIsEdit] = useState(false)

    const handleChange = (status) => {
        // alert(status)
        setIsEdit(false)
    }

    const content = (() => {
        switch (type) {
            case 'Done':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#3ac23a' }} onClick={() => setIsEdit(!isEdit)}>
                        Done
                        {isEdit && <ChangeLabel type={'Status'} handleChange={handleChange}/>}
                    </div>
                )
            case 'Working on it':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#ff9800' }} onClick={() => setIsEdit(!isEdit)}>
                        Working on it
                        {isEdit && <ChangeLabel type={'Status'} handleChange={handleChange}/>}
                    </div>
                )
            case 'Stuck':
                return (
                    <div className={styles.container} style={{ backgroundColor: '#c90303' }} onClick={() => setIsEdit(!isEdit)}>
                        Stuck
                        {isEdit && <ChangeLabel type={'Status'} handleChange={handleChange}/>}
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