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

export default function ProductScreen(props) {
    const { query } = useRouter()
    const { slug } = query

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

    return (
        <div className={styles.main}>
            <div className={styles.product}>

                <h1 className={styles.titleProduct}>Men Long sleeves white</h1>
                {/* <h1>{slug}</h1> */}
                <Image
                    width={500}
                    src="https://seekthailand.com/uploads/products/b54e058785bd1b0893fd2f1138a312bb.jpg"
                />

                <h1 className={styles.descriptionProductTitle}>Description</h1>

                <h1 className={styles.descriptionProduct}>In 1904, Frank Mitchell and Charles Ness set the future of authentic in motion when they met up in Philadelphia to establish Mitchell & Ness Sporting Goods. At first authentic vintage jerseys and apparel collections for the MLB, NFL, NBA, NCAA and MLS.Authentic. Premium. Legendary.</h1>



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