import styles from './BoardDetail.module.scss'
import { AiOutlineUserAdd, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { selectBoardById } from '../../app/reducers/boardReducer'

const BroadDetail = ({ width }) => {

    const location = useLocation()
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    const data = useSelector(selectBoardById(id))

    console.log(data)

    useEffect(() => {
        
    }, [location])

    return (
        <div className={styles.container} style={{ 'width': width }}>
            <div className={styles.header}>
                <div className={styles.information}>
                    <div className={styles.name}>
                        {data.name}
                        <AiOutlineInfoCircle style={{fontSize: '15px', margin: '0 10px'}}/>
                        <AiOutlineStar style={{fontSize: '15px'}} color='grey'/>
                    </div>
                    <div className={styles.description}>
                        Add your board's description here
                    </div>
                </div>
                <div className={styles.invite}>
                    <AiOutlineUserAdd style={{ margin: '0 10px'}}/>
                    Invite
                </div>
            </div>
            <div className={styles.tab}>

            </div>
            <div className={styles.groups}>

            </div>
        </div>
    )
}

export default BroadDetail