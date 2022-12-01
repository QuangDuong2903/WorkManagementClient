import styles from './Navigator.module.scss'
import { AiFillHome, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { SlOptions } from 'react-icons/sl'
import { useState } from 'react'

const Navigator = ({handleClickNavigatior}) => {
    const [isOpen, setIsOpen] = useState(false)
    const width = isOpen ? '17%' : '3%'
    return (
        <div className={styles.container} style={{ 'width': width }}>
            { isOpen &&
            <>
            <div className={styles.header}>
                <div className={styles.title}>
                    <AiFillHome style={{'margin': '0 8px 0 0'}}/>
                    Main WorkSpace
                </div>
                <SlOptions/>
                <div className={styles.arrowWrapper} onClick={()=> {handleClickNavigatior(!isOpen); setIsOpen(!isOpen)}}>
                    <AiOutlineArrowLeft/>
                </div>
            </div>
            <div className={styles.search}>
                <input placeholder='Search' type='text'></input>
            </div>
            </>
            }
            {!isOpen && <div className={styles.openNav} onClick={()=> {handleClickNavigatior(!isOpen); setIsOpen(!isOpen)}}><AiOutlineArrowRight/></div>}
        </div >
    )
}

export default Navigator