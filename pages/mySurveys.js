import { getSession, signOut } from "next-auth/react"
import connectDB from "../lib/connectDB"
import Surveys from "../lib/models/surveySchema"
import Link from "next/link"

function mySurveys(surveys) {
    const test1 = surveys.surveys

    return (
        <>
            <div>my Surveys</div>
            {test1.map((survey) => {
                return (
                    <li key={survey._id}>
                        <Link href={`viewResults/${survey._id}`}>
                            <a>{survey.title}</a>
                        </Link>
                        <p></p>
                    </li>
                )
            })}
        </>
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
    const datar = await Surveys.find({ profileId: session?.user.profileId }, { title: 1 })
    const data = JSON.parse(JSON.stringify(datar))
    const surveys = data

    return {
        props: { surveys: surveys },
    }
}
export default mySurveys
