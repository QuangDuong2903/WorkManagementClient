import { HelpOutline, SearchOutlined } from '@mui/icons-material'
import { Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUserAccessToken, selectUserStatus } from '../../../app/reducers/userSlice'
import MyWorkGroup from '../../../components/MyWorkGroup/MyWorkGroup'
import { TASK_API } from '../../../constant/apiURL'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './MyWorkOutlet.module.scss'

const MyWorkOutlet = () => {

    const accessToken = useSelector(selectUserAccessToken)
    const status = useSelector(selectUserStatus)

    const [data, setData] = useState()
    const [key, setKey] = useState('')
    const [isFilter, setIsFilter] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(TASK_API, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (status == 'succeeded')
            getData()
    }, [status])


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography variant='h4'>
                    My Work
                </Typography>
                <HelpOutline fontSize='20px' />
            </div>
            <div className={styles.line}>
            </div>
            <div className={styles.search}>
                <FormControl sx={{ width: '250px', margin: '0 20px 0 0' }} size='small' variant="outlined">
                    <InputLabel >Search</InputLabel>
                    <OutlinedInput
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                >
                                    <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Search"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </FormControl>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={(e) => setIsFilter(e.target.checked)} />} label="Hiden done items" />
                </FormGroup>
            </div>
            {
                data ?
                    <div className={styles.groups}>
                        <MyWorkGroup type='Past dates' data={data.pastDates.filter(task => (key.trim() ? task.name.includes(key) : true) && (isFilter ? task.status != 'Done' : true)  )} />
                        <MyWorkGroup type='Today' data={data.today.filter(task => (key.trim() ? task.name.includes(key) : true) && (isFilter ? task.status != 'Done' : true))} />
                        <MyWorkGroup type='This week' data={data.thisWeek.filter(task => (key.trim() ? task.name.includes(key) : true) && (isFilter ? task.status != 'Done' : true))} />
                        <MyWorkGroup type='Next week' data={data.nextWeek.filter(task => (key.trim() ? task.name.includes(key) : true) && (isFilter ? task.status != 'Done' : true))} />
                        <MyWorkGroup type='Later' data={data.later.filter(task => (key.trim() ? task.name.includes(key) : true) && (isFilter ? task.status != 'Done' : true))} />
                    </div>
                    :
                    <div className={styles.spin}>
                        <CircularProgress />
                    </div>
            }
        </div >
    )
}

export default MyWorkOutlet