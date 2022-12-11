import styles from './Navigator.module.scss'
import { AiFillHome, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { SlOptions } from 'react-icons/sl'
import {MdAdd} from 'react-icons/md'

import BoardNavigateButton from '../BoardNavigateButton/BoardNavigateButton'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const data = [
    {
        id: 1,
        name: 'aaaa',
        description: 'seewrwer'
    },
    {
        id: 2,
        name: 'bbb',
        description: 'ewrewrwer'
    }
]

const Navigator = ({handleClickNavigatior}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState("")
    const width = isOpen ? '17%' : '3%'

    useEffect(() => {
        setTab(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    }, [location])

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
                <div className={styles.add}>
                    <MdAdd color='white'/>
                    <div className={styles.message}>
                        Add item to workspace
                    </div>
                </div>
            </div>
            {
                data.map(board =>  {
                    return (
                        <BoardNavigateButton key={board.id} id={board.id} name={board.name} isSelected={board.id == tab} onClick={() => navigate(`/board/${board.id}`)}/>
                    )
                })
            }
            </>
            }
            {!isOpen && <div className={styles.openNav} onClick={()=> {handleClickNavigatior(!isOpen); setIsOpen(!isOpen)}}><AiOutlineArrowRight/></div>}
        </div >
    )
}

export default Navigator