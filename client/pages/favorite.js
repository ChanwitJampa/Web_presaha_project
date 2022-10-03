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

const { Meta } = Card;

export default function Favorite({ value }) {

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

    const router = useRouter()
    console.log(router.query);
    const test = router.query.value

    return (
        <div className={styles.main}>
            <h1 style={{ fontSize: "1rem" }}>Your Favorite Item</h1>
            <h1>{test}</h1>

            <div className={styles.grid}>
                {/* <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation </h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a> */}
                <Link href={`/product/$test`}>
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
                        actions={[
                            <>
                                {
                                    true ? <HeartOutlined key="edit" style={{ fontSize: '16px', color: '#E80F88', }} /> : <HeartFilled style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />
                                }
                            </>,
                            // <HeartFilled style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />,
                            <ShoppingCartOutlined key="setting" style={{ fontSize: '20px' }} onClick={toastSuccess} />,
                            <EllipsisOutlined key="ellipsis" style={{ fontSize: '20px' }} />,
                        ]}
                    >
                        <Meta
                            title="Men Long sleeves white"
                            description="699 THB"
                        />
                    </Card>
                </Link>

                <Link href={`/product/$test`}>
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
                                src="https://seekthailand.com/uploads/products/cf2f387137a7b5dbcaf85bc4f80c66d7.jpg"
                                style={{ borderRadius: "2px 2px 0 0", width: "90%", marginLeft: "1rem", marginTop: "1rem" }}
                            />
                        }
                        actions={[
                            <>
                                {
                                    false ? <HeartOutlined key="edit" style={{ fontSize: '16px', color: '#E80F88', }} /> : <HeartFilled style={{ fontSize: '16px', color: '#E80F88', }} key="edit" />
                                }
                            </>,
                            <ShoppingCartOutlined key="setting" style={{ fontSize: '20px' }} onClick={toastSuccess} />,
                            <EllipsisOutlined key="ellipsis" style={{ fontSize: '20px' }} />,
                        ]}
                    >
                        <Meta
                            title="Men Long sleeves yellow"
                            description="1299 THB"
                        />
                    </Card>
                </Link>


                {/* <Card title={"KU T-Shirt"} description={"KU T-Shirt"} image={"../assets/shirt2.jpg"} link={"https://www.ku.ac.th/th"}/> */}
                {/* <Image src={shirt2} alt="KU T-Shirt" width={500} height={500} /> */}
            </div>

        </div>


    )


}