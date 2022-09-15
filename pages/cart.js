import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'

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

                        <div className={styles.greyLine}/>

                        <CartItem />

                    </div>
                    <div className={styles.innerCartRight}>

                        <h1 className={styles.summaryTitle}>
                            Summary
                        </h1>

                        <div className={styles.greyLine}/>


                    </div>

                </div>
            </div>
        </div>


    )


}