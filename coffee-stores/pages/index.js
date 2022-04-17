import Head from 'next/head'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import Image from "next/image"
import Card from '../components/Card'
import data from "../data/coffee-stores.json"

export const getStaticProps = async (context) => {
  return {
    props: {
      data
    }
  }
}

export default function Home(props) {

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

        {props.data.length &&
          (
            <>
              <h2 className={styles.heading2}>Coffee Stores</h2>
              <div className={styles.cardLayout}>
                {props.data.map(el => {
                  return <Card
                    key={el?.id}
                    name={el?.name}
                    imgUrl={el?.imgUrl}
                    href={`/coffee-store/${el.id}`}
                    className={styles.card}
                  />
                })}

              </div>
            </>
          ) || null
        }


      </main>
    </div>
  )
}
