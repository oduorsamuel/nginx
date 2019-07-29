const Results = require('../models/lessonQuestionAnswerResults')
const Question = require('../models/LessonQuestions')
exports.get_all_lessons = (req, res) => {
    Results.find()
        .select()//specify fields to fetch here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.76",
                    message: "no lesson found"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "200.4.77",
                    message: "success",
                    data: result
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.78",
                error: err
            })
        })

}

exports.get_by_id = (req, res) => {
    Results.findById(req.params.id)
        .select()//specify fields to fetch here
        .exec()
        .then(results => {
            if (results < 1) {
                res.json({
                    status: "not found",
                    code: "400.4.79",
                    message: "content not found"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "200.4.80",
                    message: "success",
                    data: results,
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.81",
                error: err
            })
        })
}

exports.post_results = (req, res) => {
    Question.findById(req.body.QuestionId)
        .exec()
        .then(exist => {
            if (exist) {
                let userdata = new Results({
                    UserId: req.body.UserId,
                    LessonId: exist.LessonId,
                    QuestionId: req.body.QuestionId,
                    UserAnswerId: req.body.UserAnswerId,
                    CourseId: req.body.CourseId,//to be reviewed
                    IsCorrect: req.body.IsCorrect,//default set to zero
                    Attempt: req.body.Attempt,//default set to zero
                    OrderNumber: req.body.OrderNumber
                })
                userdata.save()
                    .then(savedresults => {
                        res.json({
                            status: "ok",
                            code: "200.4.82",
                            data: savedresults
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.83",
                            error: err
                        })
                    })
            } else {
                res.json({
                    status: "not found",
                    code: "400.4.84",
                    message: "invalid question"
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.85",
                error: err
            })
        })
}

exports.delete_by_id = (req, res) => {
    Results.findById(req.params.id)
        .exec()
        .then(data => {
            if (data) {
                data.UserId = data.UserId,
                    data.LessonId = data.LessonId,
                    data.QuestionId = data.QuestionId,
                    data.TimeStamp = data.TimeStamp,
                    data.CourseId = data.CourseId,
                    data.UserAnswerId = data.UserAnswerId,
                    data.IsCorrect = data.IsCorrect,
                    data.Attempt = data.Attempt,
                    data.OrderNumber = data.OrderNumber,
                    data.IsDeleted = 1,
                    data.DeletedBy = "Dev"
                data.DeletedAt = Date.now()
                data.save()
                    .then(result => {
                        res.json({
                            status: "ok",
                            code: "200.4.86",
                            message: "success",
                            data: result
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.87",
                            error: err
                        })
                    })
            }
            else {
                res.json({
                    status: "not found",
                    code: "404.4.88",
                    message: "results not found",
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "404.4.89",
                error: err
            })
        })
}
