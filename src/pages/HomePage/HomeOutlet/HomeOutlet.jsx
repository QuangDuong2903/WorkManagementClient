import styles from './HomeOutlet.module.scss'

import { useSelector } from 'react-redux'
import { selectUserData, selectUserStatus } from '../../../app/reducers/userSlice'
import ReactLoading from 'react-loading'

import { MdOutlineFeedback } from 'react-icons/md'
import { BsLightningCharge } from 'react-icons/bs'

const HomeOutlet = () => {

    const user = useSelector(selectUserData)

    const status = useSelector(selectUserStatus)

    return (
        <>
            {user && status == 'succeeded' ?
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.text}>
                            <div>
                                <p>{new Date().getHours() > 17 && 'Good nigth'}
                                    {new Date().getHours() >= 12 && new Date().getHours() <= 17 && 'Good afternoon'}
                                    {new Date().getHours() >= 0 && new Date().getHours() <= 11 && 'Good morning'},
                                    {' ' + user.givenName}!
                                </p>
                                <div className={styles.mainText}>
                                    {new Date().getHours() > 17 && `Hi night owl! We're always glad to see you here :)`}
                                    {new Date().getHours() >= 12 && new Date().getHours() <= 17 && 'Remember to keep your colleagues in the loop!'}
                                    {new Date().getHours() >= 0 && new Date().getHours() <= 11 && `Let's start the day off right :)`}
                                </div>
                            </div>
                            <div className={styles.imgWrapper}>
                                <img src='https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg'></img>
                            </div>
                        </div>
                        <div className={styles.btnContainer}>
                            <div className={styles.feedbackBtn}>
                                <MdOutlineFeedback color='black' style={{ margin: '0 5px' }} />
                                Give feedback
                            </div>
                            <div className={styles.searchBtn}>
                                <BsLightningCharge color='white' style={{ margin: '0 5px' }} />
                                Quick Search
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>

                    </div>
                </div>
                :
                <div className={styles.container}>
                    <div className={styles.spin}>
                        <ReactLoading type='spin' color='blue' height={'100%'} width={'100%'} />
                    </div>
                </div>
            }
        </>
    )
}

export default HomeOutlet