import React, { useState } from "react"
import axios from "axios"
import connectDB from "../../lib/connectDB"
import Surveys from "../../lib/models/surveySchema"
import EarnRewards from "../../components/earnRewads"
import { getSession, signOut } from "next-auth/react"

//destructuring prop from get serverside props

function answerSurver({ survey, user, _id }) {
    const { questions, title } = survey
    const answer = Array(questions.length).fill("")

    const [newAnswers, setNewAnswers] = useState(answer)
    const survId = _id
    console.log(_id)

    const handleChange = (index, newValue) => {
        const newValues = newAnswers.map((val, id) => {
            if (id === index) {
                return newValue
            }
            return val
        })
        setNewAnswers(newValues)
        console.log(newAnswers)
    }

    const submitAnswers = async () => {
        try {
            const { data } = await axios.post(
                "/api/postAnswer",

                { answers: newAnswers, surveyId: survId, profileId: user.profileId },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            )
            console.log("submitting...", data)
        } catch (error) {
            console.log("error:", error)
        }
    }

    return (
        <>
            <h1 className="flex ml-20 mt-10 text-xl mb-10">Answer Survey "{survey.title}" </h1>
            {newAnswers.map((questionData, index) => {
                return (
                    <div key={index}>
                        <h2 className="ml-10">
                            {index + 1}. {questions[index].name}
                        </h2>
                        <input
                            name="answer"
                            type="text"
                            value={questionData}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="ml-10 border-2 border-gray rounded-lg shadow-sm focus: outline-none focus: border-gray-200"
                        />
                    </div>
                )
            })}

            <button
                onClick={submitAnswers}
                className="mb-6 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                submit answers
            </button>
            <EarnRewards />
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

    const { index } = context.params
    console.log(context.params)
    await connectDB()
    const surv = await Surveys.findOne({ _id: index }, { questions: 1, _id: 1, title: 1 })
    const survey = JSON.parse(JSON.stringify(surv))

    return {
        props: { survey: survey, user: session.user, _id: index },
    }
}

export default answerSurver
