import styles from './BroadsOutlet.module.scss'

import { useState } from 'react'

import Navigator from '../../../components/Navigator/Navigator'
import BroadDetail from '../../../components/BroadDetail/BroadDetail'

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
            <BroadDetail width={broadWidth}/>
       </div>
    )
}

export default Broads