import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TbArrowLeftBar } from 'react-icons/tb';
import { Select } from 'antd';
import { InfoCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

const { Option, OptGroup } = Select;

export default function Cart() {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


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

                        <div className={styles.cartItemSection}>
                            <CartItem />
                            <div className={styles.greyLine} />

                            <CartItem />
                            <div className={styles.greyLine} />

                            <CartItem />

                        </div>


                        <div className={styles.backBtnCart}>

                            <TbArrowLeftBar style={{ fontSize: "2rem" }} />

                            <h1 className={styles.backBtnCartText}>Back to shop</h1>


                        </div>


                    </div>
                    <div className={styles.innerCartRight}>

                        <h1 className={styles.summaryTitle}>
                            Summary
                        </h1>

                        <div className={styles.greyLine} style={{ marginTop: "1.5rem" }} />

                        <div className={styles.totalCartSection}>
                            <h1 className={styles.totalTextCart}>3 Items</h1>
                            <h1 className={styles.totalPriceTextCart}>$ 123</h1>
                        </div>

                        <div className={styles.shippingSection}>
                            <h1 className={styles.labelCartSection}>
                                SHIPPING
                            </h1>

                            <Select
                                // defaultValue="choose your delivery package"
                                placeholder="Select your delivery package"
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleChange}
                            >
                                <OptGroup label="Kerry">
                                    <Option value="kerry_quick">fase 40 baht</Option>
                                    <Option value="kerry_free">normal 7 day Free</Option>
                                </OptGroup>
                                <OptGroup label="ไปรษณีย์ ไทย">
                                    <Option value="thai_normal">35 normal derivery</Option>
                                </OptGroup>
                            </Select>

                        </div>

                        <div className={styles.shippingSection}>
                            <h1 className={styles.labelCartSection}>
                                DISCOUNT CODE
                            </h1>

                            <Input
                                placeholder="Enter your code"
                                prefix={<PercentageOutlined className={styles.percentIconCart} />}
                                suffix={
                                    <Tooltip title="Enter your discount code here">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </div>

                        <div className={styles.greyLine} style={{ width: "80%", marginTop: "4rem" }} />

                        <div className={styles.totalSectionCart}>
                            <h1 className={styles.sumTextCart}>TOTAL PRICE</h1>
                            <h1 className={styles.sumPriceTextCart}>$ 123</h1>
                        </div>

                        <div className={styles.checkoutBtn}>
                            CHECKOUT
                        </div>

                    </div>

                </div>
            </div>
        </div>


    )


}