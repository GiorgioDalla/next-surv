import React, { useState } from "react"
// import Users from "../lib/models/userSchema"
// import connectDB from "../lib/connectDB"
import { ObjectID } from "bson"
import { CopyToClipboard } from "react-copy-to-clipboard"
// import { connectToDatabase } from "../lib/mongodb"

import { getSession, signOut } from "next-auth/react"
import axios from "axios"

function NewSurvey({ user }) {
    const [questions, setQuestions] = useState([])
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const id = new ObjectID()
    const inputValue = "http://localhost:3000/answerSurver/" + id


    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: questions.length,
                name: text,
            },
        ])
        setText("")
        console.log(questions, title)
    }

    const shareSurvey = async () => {}

    const submitSurvey = async () => {
        try {
            const { data } = await axios.post(
                "/api/postSurvey",

                { _id: id, title: title, questions: questions, profileId: user.profileId },
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
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <>title</>
            <input value={text} onChange={(e) => setText(e.target.value)}></input>
            <button onClick={addQuestion}>Add question</button>

            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.id + 1}.{question.name}
                    </li>
                ))}
            </ul>
            <button onClick={() => submitSurvey()}>Done</button>
            <br />
            <br />
            <CopyToClipboard text={inputValue}>
                <button onClick={shareSurvey}>Share survey</button>
            </CopyToClipboard>
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
    return {
        props: {
            user: session.user,
        },
    }
}

export default NewSurvey
