import { surveys } from ""

export default function handler(req, res) {
    const { surveyId } = req.query
    const survey = surveys.find((survey) => survey.id === parseInt(surveyId))
    res.status(200).json(survey)
}
