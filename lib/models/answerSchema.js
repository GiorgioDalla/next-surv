import mongoose from "mongoose"
var Schema = mongoose.Schema

const answerSchema = new Schema(
    {
        answers: {
            type: Array,
        },

        surveyId: [{ type: Schema.Types.ObjectId, ref: "surveys", required: "true" }],
        profileId: {
            type: String,
        },
    },
    { timestamps: true }
)

let Question = mongoose.models.answers || mongoose.model("answers", answerSchema)

export default Question
