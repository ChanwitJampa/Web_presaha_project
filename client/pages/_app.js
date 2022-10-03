import '../styles/globals.scss'
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.scss'


function MyApp({ Component, pageProps }) {
  return <>
    <Navbar />
    <Toaster position="bottom-right"
      reverseOrder={false} />
    <Component {...pageProps} />
  </>
}

export default MyApp
