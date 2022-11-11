import { getSession, signOut } from "next-auth/react"
import connectDB from "../lib/connectDB"
import Answers from "../lib/models/answerSchema"

function viewResults(answers) {
    // const { query } = useRouter()
    console.log(answers)

    const totalAnswers = answers.answers
    // const data = [...query.viewResults]
    // console.log(data)

    // console.log(answers)

    // console.log(getAnswers)

    return (
        <>
            <h1>view Results</h1>
            {totalAnswers.map(({ answers, index }) => (
                <p key={index}> {answers} </p>
            ))}
        </>
    )
}

export async function getServerSideProps(context) {
    const { viewResults } = context.params
    //viewResults[1] will return the surveyId
    const data = viewResults[1]

    await connectDB()
    const answ = await Answers.find({ surveyId: data }, { answers: 1, _id: 0 })
    const answersM = JSON.parse(JSON.stringify(answ))

    return {
        props: { answers: answersM },
    }
}

export default viewResults
