import styles from './HomeOutlet.module.scss'

import {MdOutlineFeedback} from 'react-icons/md'
import {BsLightningCharge} from 'react-icons/bs'


const HomeOutlet = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}>
                    <div>
                        <p>Good nigth, Đinh!</p>
                        <div className={styles.mainText}>Hi night owl! We're always glad to see you here :)</div>
                    </div>
                    <div className={styles.imgWrapper}>
                        <img src='https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg'></img>
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <div className={styles.feedbackBtn}>
                        <MdOutlineFeedback color='black' style={{'margin': '0 5px'}}/>
                        Give feedback
                    </div>
                    <div className={styles.searchBtn}>
                    <BsLightningCharge color='white' style={{'margin': '0 5px'}}/>
                        Quick Search
                    </div>
                </div>
            </div>
            <div className={styles.body}>

            </div>
        </div>
    )
}

export default HomeOutlet