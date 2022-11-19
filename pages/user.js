import { getSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Users from "../lib/models/userSchema"
import connectDB from "../lib/connectDB"
// import { useState } from "react"
// import axios from "axios"
import Link from "next/link"

function User({ user }) {
    const router = useRouter()
    // const [value, changeValue] = useState("New Bio")
    // async function updateBio() {
    //     const { data } = await axios.post(
    //         "/api/updateBio",
    //         { profileId: user.profileId, bio: value },
    //         {
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //         }
    //     )

    //     console.log("Bio Updated to: " + data.bio)

    //     location.reload()
    // }
    const handleClick = () => {
        console.log("Let's build survey")
        router.replace("/NewSurvey")
    }

    return (
        <div>
            <h4>User session:</h4>
            <div>Address: {user.address}</div>
            {/* <div>Bio: {bio}</div> */}
            <br />
            {/* <input onChange={(e) => changeValue(e.target.value)} value={value}></input> */}
            {/* <button onClick={() => updateBio()}>Update Bio</button> */}
            <Link href="/mySurveys/">
                <a>My surveys</a>
            </Link>
            <button onClick={handleClick}>Make Survey Now</button>
            <br />
            <br />
            <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
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

    // if (userM !== null) {
    //     userM.bio = userM.bio.toString()
    // }

    return {
        props: { user: session.user /** , bio: userM.bio*/ },
    }
}

export default User
