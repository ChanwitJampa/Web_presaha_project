import styles from '../../styles/Home.module.scss'
import CartItem from '../../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Select } from 'antd';
import { InfoCircleOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { useRouter } from 'next/router'
import { Image } from 'antd';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

export default function ProductScreen(props) {
    const { query } = useRouter()
    const { slug } = query

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    console.log(slug);

    const toastCartSuccess = () => {
        toast.success('ADD TO CART SUCCESS ',
            {
                icon: '🛒',
                style: {
                    borderRadius: '10px',
                    padding: "1rem",
                    fontWeight: "bold",
                    // fontSize: "1.5rem"
                },
            });
        console.log("TOASTTs");
    }

    const toastFavSuccess = () => {
        toast.success('ADD TO CART SUCCESS ',
            {
                icon: '❤️',
                style: {
                    borderRadius: '10px',
                    padding: "1rem",
                    fontWeight: "bold",
                    // fontSize: "1.5rem"
                },
            });
        console.log("TOASTTs");
    }

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/api/Items/${slug}`);
        setData(response.data);
        setLoading(false);
    }


    useEffect(() => {

        fetchData();
        console.log('data = = = = = ' + data);

    }, [])

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
            <div className={styles.product}>

                <h1 className={styles.titleProduct}>{data.name}</h1>
                {/* <h1>{slug}</h1> */}
                <Image
                    width={500}
                    src={data.imagePath}
                />

                <h1 className={styles.descriptionProductTitle}>Description</h1>

                <h1 className={styles.descriptionProduct}>{data.description}</h1>


                <h1 className={styles.descriptionProductTitle}>Price {data.price} $</h1>

                <Tooltip title="Favorite">
                    <Button danger shape="circle" icon={<HeartOutlined />}
                        style={{ marginTop: "3rem", backgroundColor: 'pink' }}
                        size={'large'}
                        onClick={toastFavSuccess}
                    />
                </Tooltip>

                <Button type='primary' onClick={toastCartSuccess} icon={<ShoppingCartOutlined />} size={'large'} style={{ marginLeft: "2rem" }}>
                    add to cart
                </Button>

            </div>
        </div>


    )


}