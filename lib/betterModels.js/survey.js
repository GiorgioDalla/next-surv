import { mongoose, model, models } from "mongoose"

const surveySchema = new mongoose.Schema(
    {
        // Basic survey information
        survey_id: {
            type: String,
        },
        survey_name: {
            type: String,
        },
        survey_intro: { type: String }, // a brief introduction of the survey
        Profile_id: {
            type: String,
        },

        // Survey scheme
        questions: {
            type: Array[survey_items],
        },
    },
    { timestamps: true }
)
export default surveySchema
