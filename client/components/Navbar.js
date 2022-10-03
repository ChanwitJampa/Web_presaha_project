import Link from "next/link";
import styles from '../styles/Home.module.scss'
import Logo from '../assets/LOGO-wide.png'
import Image from 'next/image'
import { Input } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Router from 'next/router'
import { Button } from "antd";
import { useEffect, useState } from "react";

const { Search } = Input;

const gotoSearch = (value) => {
    console.log(value);
    // window.location.href = `/search?value=${value}`;
    Router.push({
        pathname: '/search',
        query: { value: value },
    })
}


export default function Navbar() {
    const [user, setUser] = useState(null);

    const singout = () => {
        window.localStorage.removeItem("user");
        window.location.href = "/login";
    }

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user")));
        console.log(user);
    }, [])


    return (
        <div className={styles.navbar}>
            <div className="logo">
                <Link href="/" ><a><Image src={Logo} alt="KU T-Shirt" width={100} height={40} /></a></Link>
            </div>
            <div className={styles.item}>
                <Search
                    placeholder="Search our store"
                    onSearch={gotoSearch}
                    style={{
                        width: 200,
                    }}
                />
                <Link href="/cart" ><ShoppingCartOutlined style={{ color: "black", marginLeft: "2rem", marginRight: "0.5rem" }} /></Link>
                <h3 className={styles.cartnumber}>0</h3>

                {user
                    ? <>
                        <Link href="/profile" ><UserOutlined style={{ color: "black", marginLeft: "0rem", marginRight: "1rem" }} /></Link>
                        <Button onClick={singout} style={{ marginLeft: "2rem" }}>Logout</Button>
                    </>
                    : <>
                        <Link href="/login" style={{ marginLeft: "2rem" }} ><Button>Login</Button></Link>

                    </>
                }
            </div>

        </div>

    );
}