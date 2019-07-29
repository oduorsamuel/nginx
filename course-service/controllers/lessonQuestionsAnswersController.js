const Answers = require('../models/lessonQuestionsAnswers')
const Questions = require('../models/LessonQuestions')

exports.get_all = (req, res) => {
    Answers.find()
        .select()//specify fields to fetch here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.108",
                    message: "no lesson found"
                })

            } else {
                res.json({
                    status: "ok",
                    code: "200.4.109",
                    message: "success",
                    data: result
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.110",
                error: err
            })
        })
}
exports.get_by_id = (req, res) => {
    Answers.findById(req.params.id)
        .select()//specify fields to fetch here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.111",
                    message: "no lesson found"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "200.4.112",
                    message: "success",
                    data: result
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.113",
                error: err
            })
        })
}
exports.post_answer = (req, res) => {
    Questions.findById(req.body.LessonQuestionId)
        .exec()
        .then(results => {
            if (!results) {
                res.json({
                    status: "Not found",
                    code: "404.4.114",
                    message: "question not found",
                })
            } else {
                Answers.find({ "LessonQuestionId": req.body.LessonQuestionId, "Text": req.body.Text })
                    .exec()
                    .then(match => {
                        if (match < 1) {
                            const answers = new Answers({
                                LessonQuestionId: req.body.LessonQuestionId,
                                LessonId: results.LessonId,
                                CourseId: results.CourseId,
                                Text: req.body.Text,
                                RightAnswer: req.body.RightAnswer,
                                Type: req.body.Type,
                                OrderNumber: req.body.OrderNumber,
                                GroupText: req.body.GroupText
                            })
                            answers.save()
                                .then(savedanswers => {
                                    res.json({
                                        status: "ok",
                                        code: "200.4.115",
                                        message: "success",
                                        data: savedanswers
                                    })
                                })
                                .catch(err => {
                                    res.json({
                                        status: "bad request",
                                        code: "400.4.116",
                                        error: err
                                    })
                                })

                        } else {
                            res.json({
                                status: "conflict",
                                code: "409.4.117",
                                message: "similar match already exist"
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.118",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.119",
                error: err
            })
        })
}
exports.delete = (req, res) => {
    Answers.findById(req.params.id)
        .exec()
        .then(results => {
            if (results < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.120",
                    message: "answer not found"
                })
            } else {
                results.LessonId = results.LessonId,
                    results.CourseId = results.CourseId,
                    results.Text = results.Text,
                    results.RightAnswer = results.RightAnswer,
                    results.Type = results.Type,
                    results.OrderNumber = results.OrderNumber,
                    results.GroupText = results.GroupText,
                    results.IsDeleted = 1,
                    results.DeletedBy = "Dev",
                    results.DeletedAt = Date.now()
                results.save()
                    .then(updatedData => {
                        res.json({
                            status: "ok",
                            code: "200.4.121",
                            message: "success",
                            data: updatedData
                        })
                            .catch(err => {
                                res.json({
                                    status: "bad request",
                                    code: "40o.4.122",
                                    error: err
                                })
                            })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.123",
                error: err
            })
        })
}
exports.update = (req, res) => {
    Answers.findById(req.params.id)
        .exec()
        .then(results => {
            if (results < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.124",
                    message: "answer not found"
                })
            } else {
                results.LessonId = results.LessonId,
                    results.CourseId = results.CourseId,
                    results.Text = req.body.Text,
                    results.RightAnswer = req.body.RightAnswer,
                    results.Type = req.body.Type,
                    results.OrderNumber = req.body.OrderNumber,
                    results.GroupText = req.body.GroupText,
                    results.UpdatedBy = "Dev",
                    results.UpdatedAt = Date.now()
                results.save()
                    .then(updatedData => {
                        res.json({
                            status: "ok",
                            code: "200.4.125",
                            message: "success",
                            data: updatedData
                        })
                            .catch(err => {
                                res.json({
                                    status: "bad request",
                                    code: "400.4.126",
                                    error: err
                                })
                            })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.127",
                error: err
            })
        })
}