import styles from '../styles/Home.module.scss'
import Image from 'next/image'


export default function CartItem({ title, description, image, link }) {
    return (
        <div className={styles.cartItem}>

            <div className={styles.firstCartItem}>
                <Image src='https://seekthailand.com/uploads/products/b54e058785bd1b0893fd2f1138a312bb.jpg' width={100} height={100} />

            </div>

            <div className={styles.secondCartItem}>
                <h1>Shirt</h1>
                <h1>Cotton T-shirt</h1>

            </div>

            <div className={styles.thirdCartItem}>


            </div>

            <div className={styles.fourthCartItem}>


            </div>

            <div className={styles.fiveCartItem}>


            </div>

        </div>
    );
}
