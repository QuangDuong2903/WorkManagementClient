import styles from './MyWorkGroup.module.scss'
import moment from 'moment'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Avatar, IconButton, Typography } from '@mui/material'
import StatusLabel from '../StatusLabel/StatusLabel'
import { useState } from 'react'

const MyWorkGroup = ({ type, data }) => {

    const [isHidden, setIsHidden] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.name}>
                    {
                        isHidden ?
                            <IconButton onClick={() => setIsHidden(false)} >
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            :
                            <IconButton onClick={() => setIsHidden(true)}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                    }
                    <Typography variant='h6' sx={{
                        fontWeight: 'bold'
                    }}>
                        {type}/
                    </Typography>
                    <Typography>
                        {data?.length} items
                    </Typography>
                </div>

                {
                    !isHidden && data && data.length > 0 &&
                    <>
                        <Typography sx={{ width: '20%', textAlign: 'center' }}>
                            Board
                        </Typography>
                        <Typography sx={{ width: '10%', textAlign: 'center' }}>
                            Group
                        </Typography>
                        <Typography sx={{ width: '10%', textAlign: 'center' }}>
                            People
                        </Typography>
                        <Typography sx={{ width: '10%', textAlign: 'center' }}>
                            End Date
                        </Typography>
                        <Typography sx={{ width: '10%', textAlign: 'center' }}>
                            Status
                        </Typography>
                    </>
                }
            </div>
            <div className={styles.items}>
                {
                    !isHidden && data && data.length > 0 && data.map(task => {
                        return (
                            <div className={styles.item}
                                style={{ borderLeft: `7px solid ${task.groupColor}` }}
                            >
                                <div className={styles.name}>
                                    {task.name}
                                </div>
                                <div className={styles.board}>
                                    {task.boardName}
                                </div>
                                <div className={styles.col}>
                                    <div className={styles.color} style={{ backgroundColor: `${task.groupColor}` }}>

                                    </div>
                                    {task.groupName}
                                </div>
                                <div className={styles.col}>
                                    <Avatar sx={{ width: '25px', height: '25px' }} src='https://lh3.googleusercontent.com/a/ALm5wu1FXdzUcXvVoXwQYpqRAr8Yy7RZFMXU6srYuyaW=s96-c' />
                                </div>
                                <div className={styles.col}>
                                    {moment(task.endDate).format('ll')}
                                </div>
                                <div style={{ width: '10%', height: '100%' }}>
                                    <StatusLabel type={task.status} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyWorkGroup