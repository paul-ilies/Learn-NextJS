import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css"
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";
export const getStaticProps = async (context) => {
    const { params } = context
    let findStoreById
    try {
        const data = await fetchCoffeeStores()
        findStoreById = data.find(el => el.fsq_id === params.id)
    } catch (error) {
        console.log(error)
    }
    return {
        props: {
            coffeeStore: findStoreById ? findStoreById : {}
        }
    }
}

export const getStaticPaths = async () => {
    const data = await fetchCoffeeStores()
    const paths = data.map(el => {
        return {
            params: {
                id: el.fsq_id
            }
        }
    })
    return {
        paths,
        fallback: true
    }
}


const SingleCoffeeStore = (props) => {
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore)
    const router = useRouter();
    const {
        state: {
            coffeeStores
        }
    } = useContext(StoreContext)

    if (router.isFallback) {
        return <div>Hello</div>
    }
    const id = router.query.id;


    const handleCreateCoffeeStore = async (coffeeSore) => {
        try {
            const {
                Id,
                voting,
                name,
                address,
                neighbourhood,
                imgUrl
            } = coffeeSore
            const res = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Id,
                    voting,
                    name,
                    address: address || null,
                    neighbourhood: neighbourhood || null,
                    imgUrl
                })
            })
            const dbCoffeeStore = await res.json()
            console.log(dbCoffeeStore)
        } catch (error) {
            console.log(error)
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores.length) {
                const findStoreById = coffeeStores.find(el => el.fsq_id === id)
                if (findStoreById) {
                    setCoffeeStore(findStoreById)
                    handleCreateCoffeeStore(findStoreById)
                }
            }
        }
        else {
            handleCreateCoffeeStore(props.coffeeStore)
        }
    }, [coffeeStores, id, props.coffeeStore])

    const handleUpvoteButton = (e) => {
        e.preventDefault();
        console.log("vote")
    }
    return (
        <div className={styles.layout}>
            <Head>
                <title>{coffeeStore.name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>Back to Home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{coffeeStore.name}</h1>
                    </div>
                    <Image
                        src={coffeeStore.imgUrl || `/static/hero-image.png`}
                        alt={coffeeStore.name}
                        width={600}
                        height={360}
                        className={styles.storeImg}

                    />

                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image width={24} height={24} alt="icon" src="/static/places.svg" />
                        <p className={styles.text}>{coffeeStore?.location?.address}</p>
                    </div>
                    {coffeeStore?.location?.neighborhood && <div className={styles.iconWrapper}>
                        <Image width={24} height={24} alt="icon" src="/static/nearMe.svg" />
                        <p className={styles.text}>{coffeeStore?.location?.neighborhood}</p>
                    </div>}
                    <div className={styles.iconWrapper}>
                        <Image width={24} height={24} alt="icon" src="/static/star.svg" />
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton} >Up Vote</button>
                </div>
            </div>
        </div>
    )
}

export default SingleCoffeeStore