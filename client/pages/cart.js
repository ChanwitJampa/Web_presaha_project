import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TbArrowLeftBar } from 'react-icons/tb';
import { Select } from 'antd';
import { InfoCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import CheckoutModal from '../components/CheckoutModal';
import StripeCheckout from 'react-stripe-checkout';
import { Router } from 'next/router';

const { Option, OptGroup } = Select;

const KEY = 'pk_test_51LpZMYDfACmXb1N7AhKEZVldEHC7TdmRwCjKGdyX0UcXYqHxPvP0HcPY1PL7ixurMx06p8AZLzITe2MxNQMJXdrL00tTzlogKK';

export default function Cart() {

    const [stripeToken, setStripeToken] = useState(null);
    const [cartID, setCartID] = useState(null);
    const [total, setTotal] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shipping, setShipping] = useState(null);
    const [discount, setDiscount] = useState(null);

    let matchTemp = 0;

    const onToken = (token) => {
        console.log(token);
        setStripeToken(token);
    }

    const sumTotal = () => {

        setTotal(0);
        data.forEach(e => {
            // setTotal(total + (e.amount * e.price));
            matchTemp += (e.amount * e.price);
            console.log("e.price", e.price);
            console.log("e.amount", e.amount);
            console.log("E.PRICE", e.amount * e.price);
            console.log("total", total);

            setTotal(matchTemp);
        });

    }

    const onDiscountChange = (value) => {
        console.log(discount);
        if (discount.includes(value)) {
            console.log("YEAH!!!! MATCH" + discount.name);
        }
    };


    useEffect(() => {
        const makeRequest = async () => {
            // console.log("id" + JSON.stringify(data));
            // console.log("CART" + JSON.stringify(cartID));
            try {
                const res = await axios.post(
                    'http://localhost:5000/api/payment',
                    {
                        tokenId: stripeToken.id,
                        cartID: cartID,
                        amount: 59900

                    }
                ).then((res) => {
                    console.log(res);

                    axios.post(
                        'http://localhost:5000/api/Order',
                        {
                            userName: 'Test',
                            cartID: cartID,
                            address: stripeToken.card.address_city

                        }
                    ).then((res) => {
                        console.log(res);
                    });

                    window.location.href = "/";
                });
            } catch (err) {
                console.log(err);
            }
        };
        makeRequest();
    }, [stripeToken])


    useEffect(() => {
        if (data != null) {
            sumTotal();
        }
    }, [data])

    const fetchData = async () => {
        const response1 = await axios.get('http://localhost:5000/api/cart/Test')
            .then((res) => {
                console.log(res.data.Items);
                setData(res.data.Items);
                setCartID(res.data._id);
            })

        const responseDiscount = await axios.get('http://localhost:5000/api/discount')
            .then((res) => {
                console.log('discount' + res.data);
                setDiscount(res.data);
            })

    }

    useEffect(() => {
        fetchData();
        console.log(data);
        setLoading(false);

    }, [])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setShipping(value);
    };

    if (loading) {
        //loading on slow internet
        return <>
            <main className={styles.main}>
                <div className={styles.spinner}><Loader /></div>
            </main>
        </>
    }


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
                                {data && data.length} Items
                            </h1>

                        </div>

                        {/* <div className={styles.greyLine} /> */}

                        <div className={styles.cartItemSection}>

                            {data && data.map((item) => {

                                return (
                                    <>
                                        {item.amount > 0 && <>
                                            <div className={styles.greyLine} />
                                            <CartItem
                                                data={data}
                                                id={item.itemID}
                                                title={item.name}
                                                quantity={item.amount}
                                                price={item.price}
                                                imagePath={item.imagePath} />
                                        </>
                                        }
                                    </>
                                )
                            })}

                            {/* <CartItem />
                            <div className={styles.greyLine} />

                            <CartItem />
                            <div className={styles.greyLine} />

                            <CartItem /> */}

                        </div>

                        <Link href="/" >

                            <div className={styles.backBtnCart}>

                                <TbArrowLeftBar style={{ fontSize: "2rem", marginBottom: "0.4rem" }} />

                                <h1 className={styles.backBtnCartText}>Back to shop</h1>


                            </div>
                        </Link>


                    </div>
                    <div className={styles.innerCartRight}>

                        <h1 className={styles.summaryTitle}>
                            Summary
                        </h1>

                        <div className={styles.greyLine} style={{ marginTop: "1.5rem" }} />

                        <div className={styles.totalCartSection}>
                            <h1 className={styles.totalTextCart}>{data && data.length} Items</h1>
                            {/* <h1 className={styles.totalPriceTextCart}>$ 123</h1> */}
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
                                    <Option value="fast 40 baht">fast 40 baht</Option>
                                    <Option value="normal 7 day Free">normal 7 day Free</Option>
                                </OptGroup>
                                <OptGroup label="ไปรษณีย์ ไทย">
                                    <Option value="normal 35 derivery">normal 35 derivery</Option>
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
                                onChange={onDiscountChange}
                            />
                        </div>

                        <div className={styles.greyLine} style={{ width: "80%", marginTop: "4rem" }} />

                        <div className={styles.totalSectionCart}>
                            <h1 className={styles.sumTextCart}>TOTAL PRICE</h1>
                            <h1 className={styles.sumPriceTextCart}>$ {total}</h1>
                        </div>

                        {/* <div className={styles.checkoutBtn}>
                            CHECKOUT
                        </div> */}
                        {/* <CheckoutModal /> */}
                        <StripeCheckout
                            name='KU - SHOP'
                            image='https://avatars.githubusercontent.com/u/1486366?v=4'
                            billingAddress
                            shippingAddress
                            description={`Your total is $${123}`}
                            amount={12300}
                            token={onToken}
                            stripeKey={KEY}
                            style={{ width: "100px" }}
                        >
                            <CheckoutModal />

                        </StripeCheckout>


                    </div>

                </div>
            </div>
        </div>


    )


}