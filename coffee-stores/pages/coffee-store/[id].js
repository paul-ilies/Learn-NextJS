import { useRouter } from "next/router";
import Link from "next/link";
const SingleCoffeeStore = () => {
    const router = useRouter();
    console.log(router)
    return (
        <div>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
            <Link href="/coffee-store/dynamic">
                <a>Dynamic</a>
            </Link>
        </div>
    )
}

export default SingleCoffeeStore