import connectDB from "../../lib/connectDB"
import Users from "../../lib/models/userSchema"

export default async function updateBio(req, res) {

    const data = JSON.parse(req.body)
    console.log(data)
    const { bio, profileId } = data


    console.log(profileId, bio)
    await connectDB()

    try {

        await Users.findOneAndUpdate({ profileId: profileId }, { bio: bio })
        res.status(200).json({ bio })
    } catch (error) {
        res.status(400).json({ error })
        console.error(error)
    }
}
