import Head from 'next/head'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import Image from "next/image"
export default function Home() {

  const handleOnButtonClick = () => {
    console.log("hello")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Place you will find the best coffee shops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View Stores Nearby"
          handleOnClick={handleOnButtonClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="image-hero" width={700} height={400} />
        </div>

      </main>
    </div>
  )
}
