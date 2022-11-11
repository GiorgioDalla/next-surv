import React, { useState } from "react"
import axios from "axios"
import { connectToDatabase } from "../lib/mongodb"
import { getSession, signOut } from "next-auth/react"

import connectDB from "../lib/connectDB"

//destructuring prop from get serverside props

function answerSurver({ survey, user }) {
    const { questions, _id } = survey
    // console.log(survey)
    const answer = Array(questions.length).fill("")

    const [newAnswers, setNewAnswers] = useState(answer)

    console.log(newAnswers)

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

                { answers: newAnswers, surveyId: _id, profileId: user.profileId },
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

    //get request get questions
    //display input under each question
    //post those answers as answer sheet
    //api call must be specific to the survey

    // axios.get(`/api/getSurvey`)

    //

    return (
        <>
            <h1>Answer Survey "{survey.title}" </h1>
            {newAnswers.map((questionData, index) => {
                return (
                    <div key={index}>
                        <h2>
                            {index + 1}. {questions[index].name}
                        </h2>
                        <input
                            name="answer"
                            type="text"
                            value={questionData}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    </div>
                )
            })}

            <button onClick={submitAnswers}>submit answers</button>
            <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
        </>
    )
}
export async function getServerSideProps(context) {
    const { database } = await connectToDatabase()
    const data = await database.collection("surveys").findOne({ title: `giorgio` })
    let survey = JSON.parse(JSON.stringify(data))
    

    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        }
    }

    return {
        props: { survey: survey, user: session.user },
    }
}

export default answerSurver
