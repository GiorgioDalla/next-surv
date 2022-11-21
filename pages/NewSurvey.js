import React, { useState } from "react"
import { ObjectID } from "bson"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { getSession } from "next-auth/react"
import axios from "axios"
import AddRewards from "../components/pumpIt"
// import toast, { Toaster } from "react-hot-toast"

function NewSurvey({ user }) {
    const [questions, setQuestions] = useState([])
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const id = new ObjectID()

    const inputValue = "https://wenti.vercel.app/answerSurver/" + id
    // const notify = () => toast("Survey copied to clipboard")

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
        <div className="mt-12 ml-20">
            <div className="mb-12">
                <label className="pr-12">
                    Survey title :
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="ml-3 border-2 border-gray rounded-lg shadow-sm     focus: outline-none focus: border-gray-200 font-medium  text-gray-900"
                    ></input>
                </label>
            </div>
            <button
                onClick={addQuestion}
                className="mb-6 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                Add question
            </button>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="ml-3 border-2 border-gray rounded-lg shadow-sm     focus: outline-none focus: border-gray-200"
            ></input>

            <ul className="">
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.id + 1}.{question.name}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => submitSurvey()}
                className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                Done
            </button>
            <br />
            <br />
            <AddRewards />
            <CopyToClipboard text={inputValue}>
                <button
                    className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    // onClick={notify}
                >
                    Share survey
                </button>
            </CopyToClipboard>
            {/* <Toaster /> */}

            <br />
            <br />
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
