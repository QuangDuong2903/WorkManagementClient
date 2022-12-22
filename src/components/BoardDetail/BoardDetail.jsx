import styles from './BoardDetail.module.scss'
import { AiOutlineUserAdd, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import ReactLoading from 'react-loading'
import TabButton from '../TabButton/TabButton'
import Group from '../Group/Group'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { selectBoardById, selectFirstBoardId, updateBoard, deleteBoard } from '../../app/reducers/boardReducer'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { getGroupData, createGroup } from '../../app/reducers/groupReducer'
import { selectGroupData, selectGroupStatus } from '../../app/reducers/groupReducer'

const BroadDetail = ({ width }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    const data = useSelector(selectBoardById(id))
    const accessToken = useSelector(selectUserAccessToken)
    const groupStatus = useSelector(selectGroupStatus)
    const groupData = useSelector(selectGroupData)
    const firstBoardId = useSelector(selectFirstBoardId)

    const [name, setName] = useState(data ? data.name : '')
    const [description, setDescription] = useState(data ? data.description : '')
    const [tab, setTab] = useState('main')
    const [isEditName, setIsEditName] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)

    useEffect(() => {
        setName(data ? data.name : '')
        setDescription(data ? data.description : '')
        setTab('main')
        dispatch(getGroupData({ accessToken, id }))
    }, [location])

    const handleUpdateBoardName = () => {
        setIsEditName(!isEditName)
        let data = { name }
        dispatch(updateBoard({ accessToken, id, data }))
    }

    const handleUpdateDescription = () => {
        setIsEditDescription(!isEditDescription)
        let data = { description }
        dispatch(updateBoard({ accessToken, id, data }))
    }

    const handleDeleteBoard = () => {
        dispatch(deleteBoard({ accessToken, id }))
        navigate(`/board/${firstBoardId}`)
    }

    const handleCreateGroup = () => {
        const data = {
            name: 'new group',
            color: '#1877F2',
            boardId: parseInt(id)
        }
        dispatch(createGroup({ accessToken, data }))
    }

    return (
        <div className={styles.container} style={{ 'width': width }}>
            {id != 'board' &&
                <>
                    <div className={styles.header}>
                        <div className={styles.information}>
                            <div className={styles.name}>
                                {isEditName ? <input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => handleUpdateBoardName()} />
                                    : <span onClick={() => setIsEditName(!isEditName)}>{name}</span>}
                                <AiOutlineInfoCircle style={{ fontSize: '15px', margin: '0 10px' }} />
                                <AiOutlineStar style={{ fontSize: '15px' }} color='grey' />
                                <IoMdTrash style={{ fontSize: '15px', margin: '0 10px', cursor: 'pointer' }}
                                    color='grey'
                                    onClick={() => handleDeleteBoard()}
                                />
                            </div>
                            <div className={styles.description}>
                                {isEditDescription ? <input value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => handleUpdateDescription()} />
                                    : <span onClick={() => setIsEditDescription(!isEditDescription)}>{description}</span>}
                            </div>
                        </div>
                        <div className={styles.invite}>
                            <AiOutlineUserAdd style={{ margin: '0 10px' }} />
                            Invite
                        </div>
                    </div>
                    <div className={styles.tab}>
                        <TabButton type={'main'} isSelected={tab == 'main'} onClick={() => setTab('main')} />
                        <TabButton type={'dashboard'} isSelected={tab == 'dashboard'} onClick={() => setTab('dashboard')} />
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.add} onClick={() => handleCreateGroup()}>
                            <MdAdd />
                            New Item
                        </div>
                    </div>
                    <div className={styles.groups}>
                        {
                            groupStatus === 'loading' &&
                            <div className={styles.spin}>
                                <ReactLoading type='spin' color='blue' height={'100%'} width={'100%'} />
                            </div>

                        }
                        {
                            groupStatus != 'loading' && groupData && groupData.length > 0 && groupData.map(data => {
                                return (
                                    <Group key={data.id} data={data} />)
                            })
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default BroadDetail