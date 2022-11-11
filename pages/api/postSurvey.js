import connectDB from "../../lib/connectDB"
import Surveys from "../../lib/models/surveySchema"

export default async function postSurvey(req, res) {
    const data = JSON.parse(req.body)
    console.log(data)
    const { title, questions, profileId } = data

    await connectDB()

    try {
        await Surveys.create({ title: title, questions: questions, profileId: profileId }, function (err, small) {
            if (err) return console.log(err)
        })
        res.status(201).json({ message: "Data inserted successfully!" })
    } catch (error) {
        res.status(400).json({ error })
        console.error(error)
    }
    // } else {
    //     return res.status(500).json({ msg: "this needs to be a post req" })
}
