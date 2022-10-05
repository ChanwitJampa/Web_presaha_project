import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import Router from 'next/router'


export default function CheckoutModal({ title, quantity, imagePath, price, }) {

    // const [modal2Open, setModal2Open] = useState(false);

    // const handleOk = () => {
    //     setModal2Open(false)
    //     Router.push({
    //         pathname: '/',
    //     })
    // }

    return (
        <>
            <div className={styles.checkoutBtn}
            //  onClick={() => setModal2Open(true)}
             >
                CHECKOUT
            </div>
            {/* <Modal
                title="Vertically centered modal dialog"
                centered
                visible={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal> */}
        </>
    );
}
