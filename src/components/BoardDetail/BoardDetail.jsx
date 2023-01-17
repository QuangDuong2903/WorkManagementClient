import styles from './BoardDetail.module.scss'
import { MdAdd } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Modal from 'react-modal'
import TabButton from '../TabButton/TabButton'
import Group from '../Group/Group'
import InvitePopUp from '../InvitePopUp/InvitePopUp'
import ChatBoard from '../ChatBoard/ChatBoard'
import DashBoard from '../DashBoard/DashBoard'

import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit';
import { selectBoardById, selectFirstBoardId, updateBoard, deleteBoard, selectBoardStatus } from '../../app/reducers/boardReducer'
import { selectUserAccessToken, selectUserData } from '../../app/reducers/userSlice'
import { getGroupData, createGroup } from '../../app/reducers/groupReducer'
import { selectGroupData, selectGroupStatus } from '../../app/reducers/groupReducer'
import { Button, IconButton } from '@mui/material'
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const BroadDetail = ({ width, handleNotify }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    const userData = useSelector(selectUserData)
    const data = useSelector(selectBoardById(id))
    const accessToken = useSelector(selectUserAccessToken)
    const groupStatus = useSelector(selectGroupStatus)
    const groupData = useSelector(selectGroupData)
    const firstBoardId = useSelector(selectFirstBoardId)
    const status = useSelector(selectBoardStatus)

    const [name, setName] = useState(data ? data.name : '')
    const [description, setDescription] = useState(data ? data.description : '')
    const [tab, setTab] = useState('main')
    const [isEditName, setIsEditName] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isOpenInvite, setIsOpenInvite] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [keyword, setKeyWord] = useState('')

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '35%',
        }
    }

    useEffect(() => {
        if (status == 'succeeded' && firstBoardId == '')
            navigate(`/board`)
        else if (status == 'succeeded' && firstBoardId != '')
            navigate(`/board/${firstBoardId}`)
    }, [status])

    useEffect(() => {
        setName(data ? data.name : '')
        setDescription(data ? data.description : '')
        setTab('main')
        if (status == 'succeeded' && id != 'board')
            dispatch(getGroupData({ accessToken, id }))
    }, [location, status])

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
            .then(unwrapResult)
            .then(() => {
                handleNotify('Delete board successfully', 'success')
                navigate(`/board/${firstBoardId}`)
            })
            .catch(() => {
                handleNotify('Delete Board failed', 'error')
            })
    }

    const handleCreateGroup = () => {
        const data = {
            name: 'new group',
            color: '#1877F2',
            boardId: parseInt(id)
        }
        dispatch(createGroup({ accessToken, data }))
            .then(unwrapResult)
            .then(() => {
                handleNotify('Create group successfully', 'success')
            })
            .catch(() => {
                handleNotify('Create group failed', 'error')
            })
    }

    const handleInviteSuccess = () => {
        handleNotify('Invite successfully', 'success')
    }

    const handleInviteFailure = () => {
        handleNotify('Invite failed', 'error')
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
                                <IconButton>
                                    <ErrorOutlineIcon sx={{ fontSize: '15px' }} />
                                </IconButton>
                                <IconButton>
                                    <StarBorderIcon sx={{ fontSize: '15px' }} />
                                </IconButton>
                                <IconButton onClick={() => setIsOpenConfirm(true)}>
                                    <DeleteIcon sx={{ fontSize: '15px' }} />
                                </IconButton>
                            </div>
                            <div className={styles.description}>
                                {isEditDescription ? <input value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => handleUpdateDescription()} />
                                    : <span onClick={() => setIsEditDescription(!isEditDescription)}>{description}</span>}
                            </div>
                        </div>
                        {
                            userData.id == data.owner &&
                            <Button variant="outlined" onClick={() => setIsOpenInvite(!isOpenInvite)} startIcon={<GroupAddIcon />}>
                                Invite /{1 + (data.users ? data.users.length : 0)}
                            </Button>
                        }
                    </div>
                    <div className={styles.tab}>
                        <TabButton type={'main'} isSelected={tab == 'main'} onClick={() => setTab('main')} />
                        <TabButton type={'dashboard'} isSelected={tab == 'dashboard'} onClick={() => setTab('dashboard')} />
                        <TabButton type={'chat'} isSelected={tab == 'chat'} onClick={() => setTab('chat')} />
                    </div>
                    {tab == 'main' &&
                        <>
                            <div className={styles.btn}>
                                <div className={styles.add} onClick={() => handleCreateGroup()}>
                                    <MdAdd />
                                    New Item
                                </div>
                                {isSearch ?
                                    <div className={styles.searchWithInput}>
                                        <BiSearch />
                                        <input placeholder='Search' value={keyword}
                                            onBlur={() => setIsSearch(false)}
                                            onChange={(e) => setKeyWord(e.target.value)}
                                        />
                                    </div>

                                    :
                                    <div className={styles.search} onClick={() => setIsSearch(true)}>
                                        <BiSearch />
                                        Search
                                    </div>
                                }
                            </div>
                            <div className={styles.groups}>
                                {
                                    groupStatus === 'loading' &&
                                    <div className={styles.spin}>
                                        <CircularProgress />
                                    </div>

                                }
                                {
                                    groupStatus != 'loading' && groupData && groupData.length > 0 && groupData.map(data => {
                                        return (
                                            <Group key={data.id} data={data} keyword={keyword.trim()} handleNotify={handleNotify} />)
                                    })
                                }
                            </div>
                        </>
                    }
                    {
                        tab == 'chat' &&
                        <ChatBoard id={data.id} />
                    }
                    {
                        tab == 'dashboard' &&
                        <DashBoard data={groupData} boardData={data} />
                    }
                    <Modal isOpen={isOpenInvite} style={customStyles} ariaHideApp={false}>
                        <InvitePopUp handleClose={() => { setIsOpenInvite(!isOpenInvite) }}
                            handleInviteSuccess={handleInviteSuccess}
                            handleInviteFailure={handleInviteFailure}
                            data={data}
                        />
                    </Modal>
                    <Modal isOpen={isOpenConfirm} style={customStyles} ariaHideApp={false}>
                        <ConfirmModal name={name} handleClose={() => setIsOpenConfirm(false)} handleConfirm={handleDeleteBoard} />
                    </Modal>
                </>
            }
        </div>
    )
}

export default BroadDetail