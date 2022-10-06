import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function CartItem({ title, quantity, imagePath, price, data, id }) {

    const [quantityState, setQuantityState] = useState(quantity);

    const minusQuantity = (value) => {
        console.log("minus = " + quantityState);
        setQuantityState(quantityState-1);
        axios.post('http://localhost:5000/api/cart/addItem/Test', {
            'itemID': id,
            'amount' : -1
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.data);
        });
    }

    const plusQuantity = (value) => {
        console.log("plus = " + quantityState);
        setQuantityState(quantityState+1);
        axios.post('http://localhost:5000/api/cart/addItem/Test', {
            'itemID': id,
            'amount' : 1
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.data);
        });
    }

    const postData = async () => {
        setQuantityState(quantityState- quantityState);
        axios.post('http://localhost:5000/api/cart/addItem/Test', {
            'itemID': id,
            'amount' : -quantityState
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.data);
        });
        window.location.reload();
    }

    useEffect(() => {
        setQuantityState(quantity);
    }, [])



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
                    <MinusOutlined onClick={() => minusQuantity(quantityState)} className={styles.delBtnCartItem} />
                    <h1 className={styles.quantityCartItem}>{quantityState}</h1>
                    <PlusOutlined onClick={() => plusQuantity(quantityState)} className={styles.addBtnCartItem} />
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
