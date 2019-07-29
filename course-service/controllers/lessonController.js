const Lessons = require('../models/Lesson');
const Courses = require('../models/Courses');

exports.get_all_lessons = (req, res, next) => {
    Lessons.find()
        .select()//specify field to select
        .populate('Courseid', 'Name')
        .exec()
        .then(lesson => {
            res.json({
                status: "Ok",
                code: "200.4.18",
                message: "success",
                data: lesson
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.19",
                error: err
            })
        })
}
exports.post_lesson = (req, res) => {
    Courses.findById(req.body.CourseId)
        .exec()
        .then(data => {
            if (data < 1) {
                res.json({
                    status: "Not found",
                    code: "404.4.20",
                    message: "course not found",
                    data: data
                })
            }
            else {
                Lessons.find({ "CourseId": req.body.CourseId, "Name": req.body.Name })
                    .exec()
                    .then(conflict => {
                        if (conflict < 1) {
                            const lessonData = new Lessons({
                                Name: req.body.Name,
                                Number: req.body.Number,
                                NumberOfQuestions: req.body.NumberOfQuestions,
                                PercentComplete: req.body.PercentComplete,
                                Note: req.body.Note,
                                CourseId: req.body.CourseId,
                            });
                            lessonData.save()
                                .then(savedLessons => {
                                    res.json({
                                        status: "ok",
                                        code: "200.4.21",
                                        message: "success",
                                        data: savedLessons
                                    })
                                })
                                .catch(err => {
                                    res.json({
                                        status: "bad request",
                                        code: "400.4.22",
                                        error: err
                                    })
                                })
                        }
                        else {
                            res.json({
                                status: "conflict",
                                code: "409.4.23",
                                message: "similar lesson already exist"
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            status: "ok",
                            code: "400.4.24",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.25",
                error: err
            })
        })
}
exports.get_by_id = (req, res, next) => {
    Lessons.findById(req.params.id)
        .select()//specify fields to select
        .populate('CourseId')
        .exec()
        .then(lesson => {
            res.json({
                status: "ok",
                code: "200.4.26",
                message: "lesson fetched",
                data: lesson,
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.27",
                data: err
            })
        })

}

exports.delete_by_id = (req, res) => {
    Lessons.findById(req.params.id)
        .then(Lesson => {
            if (Lesson < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.28",
                    message: "invalid id"
                })
            }
            else {
                Lesson.Name = Lesson.Name;
                Lesson.Number = Lesson.Number;
                Lesson.NumberOfQuestions = Lesson.NumberOfQuestions;
                Lesson.PercentComplete = Lesson.PercentComplete;
                Lesson.Note = Lesson.Note;
                Lesson.DeletedBy = "Dev";//req,params.userid
                Lesson.CourseId = Lesson.CourseId,
                    Lesson.DeletedAt = Date.now(),
                    Lesson.IsDeleted = 1
                Lesson.save()
                    .then(deletedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.29",
                            message: "success",
                            data: deletedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.30",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.31",
                error: err
            })
        })
}

exports.update = (req, res) => {
    Lessons.findById(req.params.id)
        .then(Lesson => {
            if (Lesson < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.32",
                    message: "invalid id"
                })
            }
            else {
                Lesson.Name = req.body.Name;
                Lesson.Number = req.body.Number;
                Lesson.NumberOfQuestions = req.body.NumberOfQuestions;
                Lesson.PercentComplete = req.body.PercentComplete;
                Lesson.Note = req.body.Note;
                Lesson.UpdatedBy = "Dev";//req,params.userid
                Lesson.CourseId = Lesson.CourseId,
                    Lesson.UpdatedAt = Date.now()
                Lesson.save()
                    .then(updatedcontent => {
                        res.json({
                            status: "ok",
                            code: "400.4.33",
                            message: "success",
                            data: updatedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.34",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.35",
                error: err
            })
        })
}