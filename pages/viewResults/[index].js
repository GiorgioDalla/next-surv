// import { getSession, signOut } from "next-auth/react"
import connectDB from "../../lib/connectDB"
import Answers from "../../lib/models/answerSchema"

function viewResults(answers) {
    console.log(answers)

    const totalAnswers = answers.answers

    return (
        <>
            <h1 className='mt-10 text-xl'>view Results</h1>
            {totalAnswers.map(({ answers, index }) => (
                <p key={index}> {answers} </p>
            ))}
        </>
    )
}

export async function getServerSideProps(context) {
    const { index } = context.params

    await connectDB()
    const answ = await Answers.find({ surveyId: index }, { answers: 1, _id: 0 })
    const answersM = JSON.parse(JSON.stringify(answ))

    return {
        props: { answers: answersM },
    }
}

export default viewResults
