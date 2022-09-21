import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TbArrowLeftBar } from 'react-icons/tb';

export default function Cart() {
    return (
        <div className={styles.main}>
            <div className={styles.cartPage}>
                <div className={styles.innerCart}>

                    <div className={styles.innerCartLeft}>

                        <div className={styles.titleBox}>

                            <h1 className={styles.titleCart}>
                                Shopping Cart
                            </h1>

                            <h1 className={styles.itemNum}>
                                3 Items
                            </h1>
                        </div>

                        <div className={styles.greyLine} />

                        <CartItem />
                        <div className={styles.greyLine} />

                        <CartItem />
                        <div className={styles.greyLine} />

                        <CartItem />

                        <div className={styles.backBtnCart}>

                            <TbArrowLeftBar style={{fontSize:"2rem"}}/>

                            <h1 className={styles.backBtnCartText}>Back to shop</h1>


                        </div>


                    </div>
                    <div className={styles.innerCartRight}>

                        <h1 className={styles.summaryTitle}>
                            Summary
                        </h1>

                        <div className={styles.greyLine} />


                    </div>

                </div>
            </div>
        </div>


    )


}