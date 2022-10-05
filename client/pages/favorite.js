import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Select } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Input, Card } from 'antd';
import History from '../components/History';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Meta } = Card;

export default function Favorite({ value }) {

    const [data, setData] = useState(null);
    const [userFav, setUserFav] = useState([]);
    const [favItem, setFavItem] = useState([]);
    // const favItem = [];
    const [loading, setLoading] = useState(true);

    const toastSuccess = () => {
        toast.success('ADD TO CART SUCCESS ',
            {
                // icon: '😝',
                style: {
                    borderRadius: '10px',
                    padding: "1rem",
                    fontWeight: "bold",
                    // fontSize: "1.5rem"
                },
            });
        console.log("TOASTTs");
    }

    const toastFavSuccess = (props) => {
        axios.post(`http://localhost:5000/api/FavoriteItem/Test`, {
            itemID: props
        }).then((res) => {
            console.log(res);
            console.log(res.data);
        })

        console.log('FAV ' + props);
        // fetchFav();
        console.log(userFav);
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
    }

    const delFavSuccess = (props) => {
        axios.delete(`http://localhost:5000/api/FavoriteItem/Test`, {
            data: {
                itemID: props
            }
        }).then((res) => {
            console.log(res);
            console.log(res.data);
        })

        console.log('UNFAV ' + props);
        // fetchFav();
        console.log(userFav);

        toast.success('DELETE FROM FAV SUCCESS ',
            {
                icon: '✖',
                style: {
                    borderRadius: '10px',
                    padding: "1rem",
                    fontWeight: "bold",
                    // fontSize: "1.5rem"
                },
            });
    }

    const fetchData = async () => {
        const response1 = await axios.get('http://localhost:5000/api/FavoriteItem/Test')
            .then((res) => {
                console.log(res.data.Items);
                setData(res.data.Items);
                // userFav.forEach(e => {
                //     // setFavItem(res.data.filter(data => data._id.includes(e)));
                //     favItem = favItem.concat(res.data.filter(data => data._id.includes(e)));
                // });

                // console.log("FAVVVVVVVVVVV === " + typeof favItem);

                // setLoading(false);
            })

        // const response2 = await axios.get('http://localhost:5000/api/FavoriteItem/Test');
        const response2 = await axios.get('http://localhost:5000/api/FavoriteItem/justID/Test');
        // console.log(response1);
        // setData(response1.data.Items);
        // console.log(data);
        setUserFav(response2.data);
        // console.log("SEARCHEDDD === " + searchItem);
        // console.log(data);
        console.log(userFav);

        setLoading(false);
    }

    useEffect(() => {

        fetchData();
        // setsearchItem(data.filter(data => data.includes(params)));

        // axios.get('http://localhost:5000/api/Items').then(res => {
        //   // console.log('item',res.data);
        //   setData(res.data);
        //   console.log('data', data);
        // }).catch((err) => {
        //   console.log(err);
        // })

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
            <h1 style={{ fontSize: "1rem" }}>Your Favorite Item</h1>

            <div className={styles.grid}>

                {/* {userFav && favItem.map((item) => { */}
                {data && data.map((item) => {
                    return (
                        <Card
                            hoverable
                            style={{
                                width: 300,
                                marginRight: "2rem",
                                marginTop: "1rem"
                            }}
                            cover={
                                <Link href={`/product/${item._id}`}>
                                    <img
                                        alt="item"
                                        src={item.imagePath}
                                        className='test'
                                        style={{ borderRadius: "2px 2px 0 0", width: "90%", marginLeft: "1rem", marginTop: "1rem" }}
                                    />
                                </Link>
                            }
                            actions={[
                                <>
                                    <HeartFilled onClick={() => delFavSuccess(item._id)} style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />
                                    
                                </>,
                                // <HeartFilled style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />,
                                <ShoppingCartOutlined key="setting" style={{ fontSize: '20px' }} onClick={toastSuccess} />,
                                <EllipsisOutlined key="ellipsis" style={{ fontSize: '20px' }} />,
                            ]}
                        >
                            <Meta
                                title={item.name}
                                description={item.price}
                            />
                        </Card>
                    )
                })}


                {/* <Card title={"KU T-Shirt"} description={"KU T-Shirt"} image={"../assets/shirt2.jpg"} link={"https://www.ku.ac.th/th"}/> */}
                {/* <Image src={shirt2} alt="KU T-Shirt" width={500} height={500} /> */}
            </div>

        </div>


    )


}