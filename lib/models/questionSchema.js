import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    QuestionInupt: {
      type: String,
    },
    profileId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

let Questions =
  mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Questions;
