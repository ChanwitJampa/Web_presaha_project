import styles from '../styles/Home.module.scss'
import CartItem from '../components/CartItem'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TbArrowLeftBar } from 'react-icons/tb';
import { Button, Select } from 'antd';
import { InfoCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Option, OptGroup } = Select;

export default function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    let test ;

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onChangeID = (e) => {
        setId(e.target.value);
        console.log(id);
    };

    const onChangePass = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };

    const submit = () => {
        console.log("submit");
        console.log("id", id);
        console.log("password", password);


        axios.post('http://localhost:5000/api/login', {
            userName: id,
            password: password
        }).then(function (response) {
            console.log(response);

            window.localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/";
            // test = JSON.parse(window.localStorage.getItem("user"));
            // console.log('test',test);
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {

        // window.localStorage.removeItem("user");
    }, [])



    return (
        <div className={styles.main}>
            <div className={styles.loginPage}>
                <h1>Login</h1>
                <Input size="large" placeholder="user" style={{ marginBottom: "2rem" }} onChange={onChangeID} />
                <Input.Password size="large" placeholder="password" style={{ marginBottom: "2rem" }} onChange={onChangePass} />
                <Button onClick={submit}>Login</Button>
            </div>
        </div>


    )


}