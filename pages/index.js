import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Card from '../components/Card'
import shirt2 from '../assets/shirt2.jpg'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>KU E-SHOP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          KU E-SHOP
        </h1>

        <p className={styles.description}>
          WELCOME to our STORE
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation </h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <Card title={"KU T-Shirt"} description={"KU T-Shirt"} image={"../assets/shirt2.jpg"} link={"https://www.ku.ac.th/th"}/>
        <Image src={shirt2} alt="KU T-Shirt" width={500} height={500} />


        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
