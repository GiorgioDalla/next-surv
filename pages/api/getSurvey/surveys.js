import { connectToDatabase } from "../../../lib/mongodb"

export default async function handler(req, res) {
    try {
        //destructuring database
        const { database } = await connectToDatabase()
        console.log("Just connected !")
        const collection = database.collection("surveys")
        const data = await collection.find({}).toArray()
        res.json(data)
    } catch (e) {
        console.log(e)
        response.status(500).json(e)
    }
}
