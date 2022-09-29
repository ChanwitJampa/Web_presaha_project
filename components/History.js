import styles from '../styles/Home.module.scss'
import { Button, Modal, Card } from 'antd';
import React, { useState } from 'react';


const { Meta } = Card;


export default function History({ num, price, image, link }) {
    const [modal2Open, setModal2Open] = useState(false);

    const handleOk = () => setModal2Open(false)


    return (
        <>
            <div className={styles.historyComponent} onClick={() => setModal2Open(true)}>
                <h1 className={styles.historyNumber}>
                    การสั่งซื้อที่ {num}
                </h1>

                <h1 className={styles.historyPrice}>
                    ยอดสั่งซื้อ = {price} บาท
                </h1>
            </div>



            <Modal
                title="Order History"
                centered
                open={modal2Open}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
                width={1000}
            >
                <div className={styles.historyItem}>

                    <Card
                        hoverable
                        style={{
                            width: 200,
                            marginRight: "2rem",
                            marginTop: "1rem"
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://seekthailand.com/uploads/products/b54e058785bd1b0893fd2f1138a312bb.jpg"
                                className='test'
                                style={{ borderRadius: "2px 2px 0 0", width: "90%", marginLeft: "1rem", marginTop: "1rem" }}
                            />
                        }
                    >
                        <Meta
                            title="Men Long sleeves white"
                            description="699 THB"
                        />
                    </Card>

                    <div className={styles.numHistoryItem}>
                        <h1 className={styles.countItem}>x 1</h1>

                    </div>

                </div>

                <h1 className={styles.totalHistory}>Total 5000 บาท</h1>
            </Modal>
        </>
        // <a href={link} className={styles.outline}>
        // <h2>{title}</h2>
        // <p>{description}</p>
        // <img src={image} alt={title} />
        // </a>
    );
}
