const LessonPart = require('../models/LessonPart');
const lessons = require('../models/Lesson')

exports.get_all_LessonParts = (req, res) => {
    LessonPart.find()
        .select()//specify fields to select here
        .exec()
        .then(results => {
            if (!results) {
                res.json({

                    status: 'ok',
                    code: "200.4.56",
                    message: 'no record found',
                });

            } else {
                res.json({
                    status: 'ok',
                    code: "200.4.57",
                    message: 'success',
                    data: results
                });
            }
        })
        .catch(err => {
            res.json({
                status: 'bad request',
                code: "200.4.58",
                err: err
            });
        })
}
exports.post_LessonPart = (req, res) => {
    lessons.findById(req.body.LessonId)//can be replaced by req.params
        .exec().
        then(lesson => {
            if (!lesson) {
                res.json({
                    status: "Not found",
                    code: "404.4.59",
                    message: "The lesson doesnt exist"
                })
            }
            else {
                console.log(req.body.LessonId)
                LessonPart.find({ 'LessonId': req.body.LessonId, 'Title': req.body.Title })
                    .exec()
                    .then(data => {

                        if (data < 1) {
                            const userData = new LessonPart({
                                Title: req.body.Title,
                                Type: req.body.Type,
                                LessonId: req.body.LessonId,
                                CourseId: lesson.CourseId,
                                POS: req.body.POS,
                            });
                            userData.save().then(result => {
                                res.json({
                                    status: "ok",
                                    code: "200.4.60",
                                    message: "lesson part added successfully",
                                    data: result
                                })
                            })
                                .catch(err => {
                                    res.json({
                                        status: "bad request",
                                        code: "400.4.61",
                                        data: err
                                    })
                                })
                        } else {
                            res.json({
                                status: "conflict",
                                code: "409.4.62",
                                message: "The part with the similar title already exist",
                                data: data
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.63",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.64",
                error: err
            })
        })
}

exports.get_by_id = (req, res) => {
    LessonPart.findById(req.params.id)
        .select()//specify fields to select here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.65",
                    message: "lesson part not found",
                    lessonpart: result
                })
            }
            else {
                res.json({
                    status: "ok",
                    code: "200.4.66",
                    message: "lesson part fetched successfully",
                    lessonpart: result
                })
            }

        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.67",
                error: err
            })
        })
}
exports.delete_by_id = (req, res) => {
    LessonPart.findById(req.params.id)
        .then(content => {
            if (content < 1) {
                res.json({
                    status: "ok",
                    code: "400.4.68",
                    message: "invalid id"
                })
            }
            else {
                content.Title = content.Title;
                content.Type = content.Type;
                content.Pos = content.Pos;
                content.CourseId = content.CourseId;
                content.LessonId = content.LessonId;
                content.DeletedBy = "Dev";//req,params.userid
                content.DeletedAt = Date.now();
                content.IsDeleted = 1
                content.save()
                    .then(deletedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.69",
                            message: "success",
                            data: deletedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.70",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.71",
                error: err
            })
        })
}


exports.update = (req, res) => {
    LessonPart.findById(req.params.id)
        .then(content => {
            if (content < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.72",
                    message: "invalid id"
                })
            }
            else {
                content.Title = req.body.Title;
                content.Type = req.body.Type;
                content.pos = req.body.pos;
                content.CourseId = content.CourseId;
                content.LessonId = content.LessonId;
                content.UpdatedBy = "Dev";//req,params.userid
                content.UpdatedAt = Date.now();
                content.save()
                    .then(updatedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.73",
                            message: "success",
                            data: updatedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.74",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.75",
                error: err
            })
        })
}
