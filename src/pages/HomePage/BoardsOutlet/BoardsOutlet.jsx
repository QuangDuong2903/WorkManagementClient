import styles from './BoardsOutlet.module.scss'

import { useState } from 'react'

import Navigator from '../../../components/Navigator/Navigator'
import BoardDetail from '../../../components/BoardDetail/BoardDetail'

const Broads = () => {

    //const [isOpen, setIsOpen] = useState(false)
    const [broadWidth, setBroadWidth] = useState('97%')

    const handleClickNavigatior = (isOpenNav) => {
        if(isOpenNav)
            setBroadWidth('83%')
        else
            setBroadWidth('97%')
    }

    return (
       <div className={styles.container}>
            <Navigator handleClickNavigatior={handleClickNavigatior}/>
            <BoardDetail width={broadWidth}/>
       </div>
    )
}

export default Broads