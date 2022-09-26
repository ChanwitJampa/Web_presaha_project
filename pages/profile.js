import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TbArrowLeftBar } from 'react-icons/tb';
import { Select } from 'antd';
import { InfoCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

const { Option, OptGroup } = Select;

export default function Profile() {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    return (
        <div className={styles.main}>
            <div className={styles.profilePage}>

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
        </div>


    )


}