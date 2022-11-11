import mongoose from "mongoose"

const questionSchema = new mongoose.Schema(
    {
        order: {
            type: Int32,
        },

        question: {
            type: String,
        },
        optional: {
            Bool,
        },
        profileId: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
)

let Questions = mongoose.models.questions || mongoose.model("questions", questionSchema)

export default Questions
