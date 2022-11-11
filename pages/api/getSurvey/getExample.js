// import { connectToDatabase } from "../../../lib/mongodb"
// import connectDB from "../../../lib/connectDB"
// import Answers from "../../../lib/models/answerSchema"

// export default async function handler(req, res) {
//     try {
//         // const { database } = await connectToDatabase()
//         // const db = mongoClient.db("AddressAndSignature")
//         // const collection = database.collection("answers")
//         // const results = await collection
//         //     .find({ surveyId: "636c1e5440b72575ce203ab6" }, { answers: 1, _id: 0 })
//         //     .toArray()
//         await connectDB()
//         const answ = await Answers.find(
//             { surveyId: "636c1e5440b72575ce203ab6" },
//             { answers: 1, _id: 0 }
//         )
//         res.status(200).json(answ)
//     } catch (e) {
//         console.log(e)
//         res.status(500).json(e)
//     }
// }
