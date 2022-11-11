import React from "react"
import { useState } from "react"

function AddQuestion() {

    const [title, setTitle] = useState()
    const [questions, setQuestions] = useState([])
    const adder = () => {
        setQuestions([
            ...questions,
            {
                id: questions.length,
                text: "",
            },
        ])
        return (
            <form>
                <>
                    <input
                        type="text"
                        value={questions.text}
                        onChange={(e) => setQuestions({ ...questions, value: e.target.value })}
                    >
                        question
                    </input>
                    <button onClick={adder}> submit question</button>
                </>
            </form>
        )
    }
}

export default AddQuestion
//update UI with a useeffect
