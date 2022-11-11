import React, { useState, useEffect } from "react"

function QuestionInput() {
    const [questions, setQuestions] = useState([])
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")

    // const addTitle = () => {}

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: questions.length,
                name: text,
            },
        ])
        setText("")
    }

    const submitSurvey = async () => {
        const response = await fetch("../pages/api/postSurvey", {
            method: "POST",
            body: JSON.stringify({ title: title }, { questions: questions }),
            headers: {
                "Content-type": "application/json",
            },
        })
        const data = await response.json()
        console.log(data)
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
            <button onClick={submitSurvey}>Submit survey</button>
        </div>
    )
}

export default QuestionInput
