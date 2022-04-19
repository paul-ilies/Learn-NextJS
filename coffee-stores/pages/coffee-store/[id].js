import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css"
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
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


const SingleCoffeeStore = ({ coffeeStore }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Hello</div>
    }

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