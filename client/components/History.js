import styles from '../styles/Home.module.scss'
import { Button, Modal, Card } from 'antd';
import React, { useEffect, useState } from 'react';


const { Meta } = Card;


export default function History({ num, price, Items, link }) {
    const [modal2Open, setModal2Open] = useState(false);

    const handleOk = () => setModal2Open(false)

    useEffect(() => {
        console.table("Items");
        console.table(Items);
    }, [])



    return (
        <>
            <div className={styles.historyComponent} onClick={() => setModal2Open(true)}>
                <h1 className={styles.historyNumber}>
                    ID การสั่งซื้อ {num}
                </h1>

                <h1 className={styles.historyPrice}>
                    ยอดสั่งซื้อ = {price} บาท
                </h1>
            </div>



            <Modal
                title="Order History"
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
                width={1000}
            >

                {Items && Items.map((item) => {

                    return (
                        <>
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
                                            src={item.imagePath}
                                            className='test'
                                            style={{ borderRadius: "2px 2px 0 0", width: "90%", marginLeft: "1rem", marginTop: "1rem" }}
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.name}
                                        description={item.price}
                                    />
                                </Card>

                                <div className={styles.numHistoryItem}>
                                    <h1 className={styles.countItem}>x {item.amount}</h1>

                                </div>

                            </div>
                        </>
                    )


                })}



                <h1 className={styles.totalHistory}>Total {price} $</h1>
            </Modal>
        </>
        // <a href={link} className={styles.outline}>
        // <h2>{title}</h2>
        // <p>{description}</p>
        // <img src={image} alt={title} />
        // </a>
    );
}
