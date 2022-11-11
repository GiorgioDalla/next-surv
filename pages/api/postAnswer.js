import connectDB from "../../lib/connectDB"
import Answers from "../../lib/models/answerSchema"

export default async function postSurvey(req, res) {
    const data = JSON.parse(req.body)
    console.log(data)
    const { answers, profileId, surveyId } = data

    await connectDB()

    try {
        await Answers.create(
            { answers: answers, profileId: profileId, surveyId: surveyId },
            function (err) {
                if (err) return console.log(err)
            }
        )
        res.status(201).json({ message: "Data inserted successfully!" })
    } catch (error) {
        res.status(400).json({ error })
        console.error(error)
    }
    // } else {
    //     return res.status(500).json({ msg: "this needs to be a post req" })
}
