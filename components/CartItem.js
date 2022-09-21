import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';


export default function CartItem({ title, description, image, link }) {
    return (
        <div className={styles.cartItem}>

            <div className={styles.firstCartItem}>
                <Image src='https://seekthailand.com/uploads/products/b54e058785bd1b0893fd2f1138a312bb.jpg' width={100} height={100} />

            </div>

            <div className={styles.secondCartItem}>
                <h1 className={styles.itemType}>Shirt</h1>
                <h1>Cotton T-shirt</h1>

            </div>

            <div className={styles.thirdCartItem}>
                <div className={styles.quantitySection}>
                    <MinusOutlined className={styles.delBtnCartItem} />
                    <h1 className={styles.quantityCartItem}>1</h1>
                    <PlusOutlined className={styles.addBtnCartItem} />
                </div>

            </div>

            <div className={styles.fourthCartItem}>
                <h1 className={styles.itemPrice}>$ 20.00</h1>

            </div>

            <div className={styles.fiveCartItem}>
                {/* <h1 className={styles.delBtn}>X</h1> */}
                <CloseOutlined className={styles.delBtn} />

            </div>

        </div>
    );
}
