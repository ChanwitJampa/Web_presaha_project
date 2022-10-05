import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


export default function CartItem({ title, quantity, imagePath, price, data }) {

    const minusQuantity = (value) => {
        console.log("minus = " + value);
    }

    const plusQuantity = (value) => {
        console.log("plus = " + value);
    }

    const postData = async () => {
        axios.post('http://localhost:5000/api/cart/Test', {
            data

        }).then((res) => {
            console.log(res.data);
        }).then((err) => {
            console.log(err);
        })
    }


    return (
        <div className={styles.cartItem}>

            <div className={styles.firstCartItem}>
                <Image src={imagePath} width={100} height={100} />

            </div>

            <div className={styles.secondCartItem}>
                {/* <h1 className={styles.itemType}>Shirt</h1> */}
                <h1>{title}</h1>

            </div>

            <div className={styles.thirdCartItem}>
                <div className={styles.quantitySection}>
                    <MinusOutlined onClick={() => minusQuantity(quantity)} className={styles.delBtnCartItem} />
                    <h1 className={styles.quantityCartItem}>{quantity}</h1>
                    <PlusOutlined onClick={() => plusQuantity(quantity)} className={styles.addBtnCartItem} />
                </div>

            </div>

            <div className={styles.fourthCartItem}>
                <h1 className={styles.itemPrice}>$ {price}</h1>

            </div>

            <div className={styles.fiveCartItem}>
                {/* <h1 className={styles.delBtn}>X</h1> */}
                <CloseOutlined onClick={() => postData()} className={styles.delBtn} />

            </div>

        </div>
    );
}
