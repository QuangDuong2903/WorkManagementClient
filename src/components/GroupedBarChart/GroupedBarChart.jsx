import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectUserAccessToken } from '../../app/reducers/userSlice'
import { BOARD_API } from '../../constant/apiURL'
import { DONE_STATUS_COLOR, WORKING_ON_IT_STATUS_COLOR, STUCK_STATUS_COLOR } from '../../constant/color'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const GroupedBarChart = ({ groupData, boardData }) => {

    const location = useLocation()
    const accessToken = useSelector(selectUserAccessToken)
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    //const [users, setUsers] = useState([])
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        // const getUsers = async () => {
        //     try {
        //         const res = await axios.get(`${BOARD_API}/${id}/users`, {
        //             headers: {
        //                 Authorization: `Bearer ${accessToken}`
        //             }
        //         })
        //         setUsers(res.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // getUsers()
        const getData = async () => {
            try {
                const res = await axios.get(`${BOARD_API}/${id}/analyst/users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setChartData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const labels = []
    const done = []
    const workingonit = []
    const stuck = []

    chartData.forEach(data => {
        labels.push(data[1])
        stuck.push(data[2])
        workingonit.push(data[3])
        done.push(data[4])
    })

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart By Users',
            },
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    }

    // const labels = []
    // labels.push(users.find(user => user.id == boardData.owner)?.email)
    // let done = new Array(boardData.users.length + 1).fill(0)
    // let workingonit = new Array(boardData.users.length + 1).fill(0)
    // let stuck = new Array(boardData.users.length + 1).fill(0)

    // const map = {};
    // map[boardData.owner] = 0
    // let i = 1
    // boardData.users.forEach(id => {
    //     labels.push(users.find(user => user.id == id)?.email)
    //     map[id] = i++
    // })

    // groupData.forEach(group => {
    //     group.tasks.forEach(task => {
    //         switch (task.status) {
    //             case 'Done':
    //                 done[map[task.userId]]++
    //                 break;
    //             case 'Working on it':
    //                 workingonit[map[task.userId]]++
    //                 break;
    //             case 'Stuck':
    //                 stuck[map[task.userId]]++
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })
    // })

    const data = {
        labels,
        datasets: [
            {
                label: 'Stuck',
                data: stuck,
                backgroundColor: STUCK_STATUS_COLOR,
                stack: 'Stack 0',
            },
            {
                label: 'Working on it',
                data: workingonit,
                backgroundColor: WORKING_ON_IT_STATUS_COLOR,
                stack: 'Stack 0',
            },
            {
                label: 'Done',
                data: done,
                backgroundColor: DONE_STATUS_COLOR,
                stack: 'Stack 0',
            }
        ]
    }

    return <Bar options={options} data={data} />
}

export default GroupedBarChart