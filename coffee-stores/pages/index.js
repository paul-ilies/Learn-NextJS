import React, { useEffect, useState } from "react"
import Head from 'next/head'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import Image from "next/image"
import Card from '../components/Card'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'

export const getStaticProps = async (context) => {

  const data = await fetchCoffeeStores()
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation()
  const [coffeeStores, setCoffeeStores] = useState([])
  const [error, setError] = useState(null)
  const handleOnButtonClick = () => {
    handleTrackLocation()
  }

  useEffect(() => {
    async function fetchLocation() {
      if (latLong) {
        try {
          const fetchLocations = await fetchCoffeeStores(latLong)
          setCoffeeStores(fetchLocations)
        } catch (error) {
          setError(error)
        }
      }

    }
    fetchLocation()
  }, [latLong])

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Place you will find the best coffee shops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Location.." : "View Stores Nearby"}
          handleOnClick={handleOnButtonClick}
        />
        {error && <p>Something went wrong:{error.message}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="image-hero" width={700} height={400} />
        </div>
        {coffeeStores?.length &&
          (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Coffee Stores Near Me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores?.map(el => {
                  return <Card
                    key={el?.fsq_id}
                    name={el?.name}
                    imgUrl={el?.imgUrl || `/static/hero-image.png`}
                    href={`/coffee-store/${el.fsq_id}`}
                    className={styles.card}
                  />
                })}

              </div>
            </div>
          ) || null
        }

        {data?.length &&
          (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Coffee Stores</h2>
              <div className={styles.cardLayout}>
                {data?.map(el => {
                  return <Card
                    key={el?.fsq_id}
                    name={el?.name}
                    imgUrl={el?.imgUrl || `/static/hero-image.png`}
                    href={`/coffee-store/${el.fsq_id}`}
                    className={styles.card}
                  />
                })}

              </div>
            </div>
          ) || null
        }


      </main>
    </div>
  )
}
