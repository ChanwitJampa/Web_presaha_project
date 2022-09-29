import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Select } from 'antd';
import { InfoCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import History from '../components/History';

const { Option, OptGroup } = Select;

export default function Profile() {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    return (
        <div className={styles.main}>
            <div className={styles.profilePage}>

                <div className={styles.creditCardSection}>


                    <div className={styles.creditCardLeft}>
                        <div className={styles.topRowCard}>
                            <h1 className={styles.cardNumber}>* * * 4 5 6 7</h1>

                        </div>

                        <div className={styles.middleRowCard}>
                            <h1 className={styles.moneyAmount}>$ 5000</h1>
                        </div>

                        <div className={styles.bottomRowCard}>
                            <h1 className={styles.nameCard}>Jittipon Kumrai</h1>
                            <div className={styles.circleArea}>

                                <div className={styles.circleLeft}>

                                </div>

                                <div className={styles.circleRight}>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className={styles.creditCardRight}>

                    </div>
                </div>

                <BsPersonCircle style={{ fontSize: "2.5rem", marginTop: "2rem", color:"rgb(203 59 59)" }} />
                <h1>info</h1>

                <div className={styles.infoSection}>

                    <h1 className={styles.label}>Name</h1>
                    <h1 className={styles.text}>Jittipon Kumurai</h1>

                    <h1 className={styles.label}>Email</h1>
                    <h1 className={styles.text}>jittipon.ku@gmail.com</h1>

                    <h1 className={styles.label}>Telephon number</h1>
                    <h1 className={styles.text}>+66 630491424</h1>

                    <h1 className={styles.label}>Address</h1>
                    <h1 className={styles.text}>ห้อง 999 หอ Kamp 99/10 หมู่ 12 ตำบลกำแพงแสน อำเภอกำแพงแสน จังหวัดนครปฐม 73140
                        อำเภอกำแพงแสน, จังหวัดนครปฐม, 73140</h1>

                </div>

                <div className={styles.historySection}>

                    <AiOutlineFieldTime style={{ fontSize: "3rem", marginTop: "2rem" , color:"rgb(203 59 59)"}} />
                    <h1>history</h1>

                    <History num={1} price={5000} />
                    <History num={2} price={600} />
                    <History num={3} price={2500} />
                </div>



            </div>
        </div>


    )


}