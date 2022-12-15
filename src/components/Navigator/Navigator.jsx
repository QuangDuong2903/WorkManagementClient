import styles from './Navigator.module.scss'
import { AiFillHome, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { SlOptions } from 'react-icons/sl'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import BoardNavigateButton from '../BoardNavigateButton/BoardNavigateButton'
import CreateBoardPopUp from '../CreateBoardPopUp/CreateBoardPopUp'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBoardData } from '../../app/reducers/boardReducer'

const Navigator = ({ handleClickNavigatior }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const data = useSelector(selectBoardData)

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [tab, setTab] = useState("")
    const width = isOpen ? '17%' : '3%'

    useEffect(() => {
        setTab(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    }, [location])

    const handleCreateBoard = (name, description) => {
        setIsOpenModal(!isOpenModal)
        console.log({name, description})
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
        },
      }

    return (
        <div className={styles.container} style={{ 'width': width }}>
            {isOpen &&
                <>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <AiFillHome style={{ 'margin': '0 8px 0 0' }} />
                            Main WorkSpace
                        </div>
                        <SlOptions />
                        <div className={styles.arrowWrapper} onClick={() => { handleClickNavigatior(!isOpen); setIsOpen(!isOpen) }}>
                            <AiOutlineArrowLeft />
                        </div>
                    </div>
                    <div className={styles.search}>
                        <input placeholder='Search' type='text'></input>
                        <div className={styles.add} onClick={() => setIsOpenModal(!isOpenModal)}>
                            <MdAdd color='white' />
                            <div className={styles.message}>
                                Add item to workspace
                            </div>
                        </div>
                    </div>
                    {
                        data && data.length > 0 && data.map(board => {
                            return (
                                <BoardNavigateButton key={board.id} id={board.id} name={board.name} isSelected={board.id == tab} onClick={() => navigate(`/board/${board.id}`)} />
                            )
                        })
                    }
                </>
            }
            {!isOpen && <div className={styles.openNav} onClick={() => { handleClickNavigatior(!isOpen); setIsOpen(!isOpen) }}><AiOutlineArrowRight /></div>}
            <Modal isOpen={isOpenModal} style={customStyles} ariaHideApp={false}>
                <CreateBoardPopUp handleCancel={() => setIsOpenModal(!isOpenModal)} handleCreate={handleCreateBoard}/>
            </Modal>
        </div >
    )
}

export default Navigator