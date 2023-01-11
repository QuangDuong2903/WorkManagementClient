import styles from './DashBoard.module.scss'
import BarChart from '../BarChart/BarChart'
import GroupedBarChart from '../GroupedBarChart/GroupedBarChart'

const DashBoard = ({ data, boardData }) => {

    return (
        <div className={styles.container}>
            <BarChart data={data}/>
            <GroupedBarChart groupData={data} boardData={boardData} />
        </div>
    )
}

export default DashBoard