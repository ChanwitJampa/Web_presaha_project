import styles from '../styles/Home.module.scss'
import { Button, Modal, Card } from 'antd';
import React, { useState } from 'react';


const { Meta } = Card;


export default function History({ num, price, image, link }) {
    const [modal2Open, setModal2Open] = useState(false);
    return (
        <>
            <div className={styles.historyComponent} onClick={() => setModal2Open(true)}>
                <h1 className={styles.historyNumber}>
                    การสั่งซื้อที่ {num}
                </h1>

                <h1 className={styles.historyPrice}>
                    จำนวนเงิน {price} บาท
                </h1>
            </div>

            <Modal
                title="Vertically centered modal dialog"
                centered
                visible={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
            >
                <Card
                    hoverable
                    style={{
                        width: 300,
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
                    // actions={[
                    //     <>
                    //         {
                    //             true ? <HeartOutlined key="edit" style={{ fontSize: '16px', color: '#E80F88', }} /> : <HeartFilled style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />
                    //         }
                    //     </>,
                    //     // <HeartFilled style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />,
                    //     <ShoppingCartOutlined key="setting" style={{ fontSize: '20px' }} onClick={toastSuccess} />,
                    //     <EllipsisOutlined key="ellipsis" style={{ fontSize: '20px' }} />,
                    // ]}
                >
                    <Meta
                        title="Men Long sleeves white"
                        description="699 THB"
                    />
                </Card>
            </Modal>
        </>
        // <a href={link} className={styles.outline}>
        // <h2>{title}</h2>
        // <p>{description}</p>
        // <img src={image} alt={title} />
        // </a>
    );
}
