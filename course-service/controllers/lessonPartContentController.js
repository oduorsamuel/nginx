const lessonPartContent = require('../models/lessonPartContent');
const LessonPart = require('../models/LessonPart')
exports.post_content = (req, res) => {
    if(req.file){
        req.body.Content=new Date().getTime() + req.file.originalname;
        req.body.orgfilename=new Date().getTime() + req.file.originalname
        req.body.File=req.file.mimetype
    }else{
        req.body.Content=req.body.Content 
        req.body.orgfilename="null"
        req.body.File="text"
    }
    LessonPart.findById(req.body.LessonPartId)//can be replaced by req.params
        .exec().
        then(lessonpart => {
            if (!lessonpart) {
                res.json({
                    status: "Not found",
                    code: "404.4.36",
                    message: "The lesson part doesnt exist"
                })
            }
            else {
                // console.log(req.file)
                lessonPartContent.find({ 'LessonPartId': req.body.LessonPartId, 'Content': req.body.Content })
                    .exec()
                    .then(data => {

                        if (data < 1) {
                            const userData = new lessonPartContent({
                                LessonPartId: req.body.LessonPartId,
                                Type: req.body.Type,
                                CourseId: lessonpart.CourseId,
                                LessonId: lessonpart.LessonId,
                                Content: req.body.Content,
                                File: req.body.File,
                                orgfilename: req.body.orgfilename
                            });
                            userData.save().then(result => {
                                res.json({
                                    status: "created",
                                    code: "400.4.37",
                                    message: "lesson content part added successfully",
                                    data: result
                                })
                            })
                                .catch(err => {
                                    res.json({
                                        status: "bad request",
                                        code: "400.4.38",
                                        error: err
                                    })
                                })
                        } else {
                            res.json({
                                status: "conflict",
                                code: "409.4.39",
                                message: "The content part with the similar information already exist",
                                data: data
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.40",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.41",
                error: err
            })
        })
}

exports.get_lesson_content_parts = (req, res) => {
    lessonPartContent.find()
        .select()//specify fields to select here
        .exec()
        .then(content => {
            if (content < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.42",
                    message: "No lesson part content found"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "200.4.43",
                    message: "lesson parts content fetched",
                    data: content
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.44",
                error: err
            })
        })
}

exports.get_by_id = (req, res) => {
    lessonPartContent.findById(req.params.id)
        .select()//specify fields to select here
        .exec()
        .then(data => {
            if (data < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.45",
                    message: "requested id does not exist"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "400.4.46",
                    message: "success",
                    data: data
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.47",
                error: err
            })
        })
}

exports.update = (req, res) => {
    lessonPartContent.findById(req.params.id)
        .then(content => {
            if (content < 1) {
                res.json({
                    status: "bad request",
                    code: "400.4.48",
                    message: "invalid id"
                })
            }
            else {
                if(req.file){
                    req.body.Content=new Date().getTime() + req.file.originalname;
                    content.orgfilename=new Date().getTime() + req.file.originalname
                    content.File=req.file.mimetype
                }else if(!req.file){
                    req.body.Content=content.Content,
                    content.File = content.File,
                    content.orgfilename = content.orgfilename
                }
                   content.LessonPartId = content.LessonPartId,
                    content.Type = req.body.Type,
                    content.CourseId = content.CourseId,
                    content.LessonId = content.LessonId,
                    content.Pos = req.body.Pos,
                    content.Content = req.body.Content,
                    // content.File = req.body.File,
                    // content.orgfilename = req.body.orgfilename,
                    content.UpdatedAt = Date.now(),
                    content.UpdatedBy = "Dev"
                content.save()
                    .then(updatedcontent => {
                        res.json({
                            status: "ok",
                            code: "400.4.49",
                            message: "success",
                            data: updatedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.50",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.51",
                error: err
            })
        })
}

exports.delete_by_id = (req, res) => {
    lessonPartContent.findById(req.params.id)
        .then(content => {
            if (content < 1) {
                res.json({
                    status: "bad request",
                    code: "400.4.52",
                    message: "invalid id"
                })
            }
            else {
                content.LessonPartId = content.LessonPartId,
                    content.Type = content.Type,
                    content.CourseId = content.CourseId,
                    content.LessonId = content.LessonId,
                    content.Pos = content.Pos,
                    content.Content = content.Content,
                    content.File = content.File,
                    content.orgfilename = content.orgfilename,
                    content.DeletedAt = Date.now(),
                    content.DeletedBy = "Dev",
                    content.IsDeleted = 1
                content.save()
                    .then(deletedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.53",
                            message: "success",
                            data: deletedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.54",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.55",
                error: err
            })
        })
}
