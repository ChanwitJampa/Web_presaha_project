import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Button, Select } from 'antd';
import { InfoCircleOutlined, HeartOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import History from '../components/History';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import axios from 'axios';

const { Option, OptGroup } = Select;

export default function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response1 = await axios.get('http://localhost:5000/api/Order/getByUsername/Test');
        setData(response1.data);
        console.log(data);
        setLoading(false);

    }

    useEffect(() => {
        fetchData();
        setUser(JSON.parse(window.localStorage.getItem("user")));
        console.log(user);
        setLoading(false);
    }, [])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    if (loading) {
        //loading on slow internet
        return <>
            <main className={styles.main}>
                <div className={styles.spinner}><Loader /></div>
            </main>
        </>
    }

    return (
        <div className={styles.main}>
            <div className={styles.profilePage}>

                <div className={styles.creditCardSection}>


                    <div className={styles.creditCardLeft}>
                        <div className={styles.topRowCard}>
                            <h1 className={styles.cardNumber}>* * * 4 5 6 7</h1>

                        </div>

                        <div className={styles.middleRowCard}>
                            {/* <h1 className={styles.moneyAmount}>$ 5000</h1> */}
                            <h1 className={styles.moneyAmount}> CARD</h1>

                        </div>

                        <div className={styles.bottomRowCard}>
                            {/* <h1 className={styles.nameCard}>Jittipon Kumrai</h1> */}
                            <h1 className={styles.nameCard}>{user.firstName} {user.lastName}</h1>
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

                <div>
                    <Link href='/favorite'>
                        <Button icon={<HeartOutlined style={{ color: "red" }} />} style={{ marginTop: "2rem" }}>Favorite Item</Button>
                    </Link>
                </div>

                <BsPersonCircle style={{ fontSize: "2.5rem", marginTop: "2rem", color: "rgb(203 59 59)" }} />
                <h1>info</h1>

                <div className={styles.infoSection}>

                    <h1 className={styles.label}>Name</h1>
                    <h1 className={styles.text}>{user.firstName} {user.lastName}</h1>

                    <h1 className={styles.label}>Telephon number</h1>
                    <h1 className={styles.text}>{user.phoneNumber}</h1>

                    <h1 className={styles.label}>Address</h1>
                    <h1 className={styles.text}>{user.address}</h1>

                </div>

                <div className={styles.historySection}>

                    <AiOutlineFieldTime style={{ fontSize: "3rem", marginTop: "2rem", color: "rgb(203 59 59)" }} />
                    <h1>history</h1>

                    {data && data.map((item) => {

                        return (
                            <>
                                <History num={item._id} price={item.total} Items={item.Items}/>
                            </>
                        )
                    })}
                    {/* <History num={1} price={5000} />
                    <History num={2} price={600} />
                    <History num={3} price={2500} /> */}
                </div>



            </div>
        </div>


    )


}