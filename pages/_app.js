import '../styles/globals.scss'
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return <>
    <Navbar />
    <Toaster position="bottom-right"
      reverseOrder={false} />
    <Component {...pageProps} />
  </>
}

export default MyApp
