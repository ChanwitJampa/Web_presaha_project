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
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const { Meta } = Card;


export default function Search({ value }) {

    const router = useRouter()
    console.log(router.query);
    let params = router.query.value

    const [data, setData] = useState(null);
    const [searchItem, setsearchItem] = useState(null);
    const [userFav, setUserFav] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchData();
    }, [params])

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
        const response1 = await axios.get('http://localhost:5000/api/Items').then((res) => {
            // setData(res.data);
            setsearchItem(res.data.filter(data => data.name.includes(params)));
            console.log("SEARCHEDDD === " + searchItem);

            // setLoading(false);
        })

        const response2 = await axios.get('http://localhost:5000/api/FavoriteItem/justID/Test');

        // setData(response1.data);
        setUserFav(response2.data);
        // console.log("SEARCHEDDD === " + searchItem);
        // console.log(data);
        // console.log(userFav);

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
            <h1 style={{ fontSize: "1rem" }}>Your Search Result</h1>
            <h1>{params}</h1>

            <div className={styles.grid}>

                {searchItem && searchItem.map((item) => {
                    // console.log('item',item);
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
                                        alt="example"
                                        src={item.imagePath}
                                        className='test'
                                        style={{ borderRadius: "2px 2px 0 0", width: "90%", marginLeft: "1rem", marginTop: "1rem" }}
                                    />
                                </Link>
                            }
                            actions={[
                                <>
                                    {
                                        !(userFav.includes(item._id))
                                            ? <HeartOutlined onClick={() => toastFavSuccess(item._id)} key="edit" style={{ fontSize: '16px', color: '#E80F88', }} />
                                            : <HeartFilled onClick={() => delFavSuccess(item._id)} style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />
                                    }
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