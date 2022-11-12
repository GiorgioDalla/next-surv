import mongoose from "mongoose"

const surveySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "id needed"],
    },

    title: {
        type: String,
        required: [true, "please add a title"],
    },
    questions: {
        type: Array,
    },

    profileId: {
        type: String,
        required: [true, "need profileId"],
    },
    date: { type: Date, default: Date.now },
})

let Surveys = mongoose.models.surveys || mongoose.model("surveys", surveySchema)

export default Surveys
