import Link from "next/link";
import styles from '../styles/Home.module.scss'
import Logo from '../assets/LOGO-wide.png'
import Image from 'next/image'
import { Input } from 'antd';
import { ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';

const { Search } = Input;

const onSearch = (value) => console.log(value);


export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className="logo">
                <Link href="/" ><a><Image src={Logo} alt="KU T-Shirt" width={100} height={40} /></a></Link>
            </div>
            <div className={styles.item}>
                <Search
                    placeholder="Search our store"
                    onSearch={onSearch}
                    style={{
                        width: 200,
                    }}
                />
                {/* <Link href="/" ><a style={{marginLeft: "1rem"}}>Home</a></Link> */}
                <Link href="/cart" ><ShoppingCartOutlined style={{ color: "black", marginLeft: "2rem", marginRight: "0.5rem" }} /></Link>
                <h3 className={styles.cartnumber}>0</h3>
                <Link href="/" ><UserOutlined style={{ color: "black", marginLeft: "2rem", marginRight: "0.5rem" }} /></Link>
            </div>

        </div>

    );
}