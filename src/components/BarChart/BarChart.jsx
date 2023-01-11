import React from 'react'
import { Bar } from 'react-chartjs-2'
import { DONE_STATUS_COLOR, WORKING_ON_IT_STATUS_COLOR, STUCK_STATUS_COLOR } from '../../constant/color';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const BarChart = ({ data }) => {

    let done = new Array(12).fill(0)
    let workingonit = new Array(12).fill(0)
    let stuck = new Array(12).fill(0)

    data.forEach(group => {
        group.tasks.forEach(task => {
            switch (task.status) {
                case 'Done':
                    done[new Date(task.endDate).getMonth()]++
                    break;
                case 'Working on it':
                    workingonit[new Date(task.endDate).getMonth()]++
                    break;
                case 'Stuck':
                    stuck[new Date(task.endDate).getMonth()]++
                    break;
                default:
                    break;
            }
        })
    })

    return (
        <Bar
            data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Done',
                        data: done,
                        backgroundColor: DONE_STATUS_COLOR,
                    },
                    {
                        label: 'Working on it',
                        data: workingonit,
                        backgroundColor: WORKING_ON_IT_STATUS_COLOR,
                    },
                    {
                        label: 'Stuck',
                        data: stuck,
                        backgroundColor: STUCK_STATUS_COLOR,
                    }
                ]
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart by months',
                    },
                },
            }}
        />
    )
}

export default BarChart