import { getSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Users from "../lib/models/userSchema"
import connectDB from "../lib/connectDB"
import Link from "next/link"

function User({ user }) {
    const router = useRouter()

    const handleClick = () => {
        console.log("Let's build survey")
        router.replace("/NewSurvey")
    }

    return (
        <div className="w- h-96 flex justify-center items-center">
            <Link href="/mySurveys/">
                <a className="mb-6 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">My surveys</a>
            </Link>
            <br />
            

            <button onClick={handleClick} className="mb-6 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Make Survey Now</button>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        }
    }

    await connectDB()

    const userM = await Users.findOne({ profileId: session?.user.profileId }).lean()

    return {
        props: { user: session.user },
    }
}

export default User
