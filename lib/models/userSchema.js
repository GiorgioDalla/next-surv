import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
            
        },
        bio: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
)

let Users = mongoose.models.users || mongoose.model("users", userSchema)

export default Users
