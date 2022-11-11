// import { connectToDatabase } from "../../../lib/mongodb"
import connectDB from "../../lib/connectDB"
import Surveys from "../../lib/models/surveySchema"

export default async function handler(req, res) {
    try {
        await connectDB()
        const answ = await Surveys.find(
            { profileId: "0xcb5cd300a9ab5ac3919a64a04b554105ed9991331672e379948b6efdbc3bddea" },
            { title: 1, _id: 0 }
        )
        res.status(200).json(answ)
        console.log(answ)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}
