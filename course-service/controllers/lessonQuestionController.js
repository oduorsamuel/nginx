const Questions = require('../models/LessonQuestions')
const Lessons = require('../models/Lesson')


exports.get_all = (req, res) => {
    Questions.find()
        .select()//specify field to fetch here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404:4.90",
                    message: "questions not available"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "409:4.91",
                    message: "success",
                    data: result

                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400:4.92",
                error: err
            })
        })
}

exports.post_lessonquestion = (req, res) => {
    if(!req.file){
        req.body.SpeakFile="null"  
    }
    else if(req.file.mimetype.split("/")[0]==="audio"){
     req.body.SpeakFile=req.hostname +'/'+req.file.path
    }else{
        res.json({
            code:"400.4.93",
            message:"speekfile must be audio"
        })
    }
    Lessons.findById(req.body.LessonId)//can be replaced by req.params
        .exec().
        then(lesson => {
            if (!lesson) {
                res.json({
                    status: "Not found",
                    code: "404.4.93",
                    message: "The lesson doesnt exist"
                })
            }
            else {
                const lessonQuestions = new Questions({
                    LessonId: req.body.LessonId,//to be replaced by params
                    CourseId: lesson.CourseId,
                    Text: req.body.Text,
                    Mandatory: req.body.Mandatory,
                    SpeakFile: req.body.SpeakFile
                })
                lessonQuestions.save()
                    .then(result => {
                        res.json({
                            status: "created",
                            code: "200.4.94",
                            message: "question created",
                            data: result
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "200.4.95",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.96",
                error: err
            })
        })
}
exports.delete_by_id = (req, res) => {
    Questions.findById(req.params.id)
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.97",
                    message: "invalid id"
                })
            } else {
                result.Text = result.Text;
                result.Mandatory = result.Mandatory;
                result.Pos = result.Pos;
                result.CourseId = result.CourseId;
                result.LessonId = result.LessonId;
                result.SpeakFile = result.SpeakFile;
                result.DeletedBy = "Dev";//req,params.userid
                result.DeletedAt = Date.now();
                result.IsDeleted = 1
                result.save()
                    .then(deletedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.98",
                            message: "success",
                            data: deletedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.99",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.100",
                error: err
            })
        })
}
exports.get_by_id = (req, res) => {
    Questions.findById(req.params.id)
        .select()//specify field to fetch here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.101",
                    message: "invalid id"
                })
            } else {
                res.json({
                    status: "ok",
                    code: "200.4.102",
                    message: "success",
                    data: result
                })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.103",
                error: err
            })
        })
}
exports.update = (req, res) => {
    Questions.findById(req.params.id)
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.104",
                    message: "invalid id"
                })
            } else {
                if(!req.file){
                    req.body.SpeakFile=result.SpeakFile
                }
                else if(req.file.mimetype.split("/")[0]==="audio"){
                 req.body.SpeakFile=req.hostname +'/'+req.file.path
                }
                result.Text = req.body.Text;
                result.Mandatory = req.body.Mandatory;
                result.Pos = result.Pos;
                result.CourseId = result.CourseId;
                result.LessonId = result.LessonId;
                result.SpeakFile = req.body.SpeakFile;
                result.UpdatedBy = "Dev";//req,params.userid
                result.UpdatedAt = Date.now();
                result.save()
                    .then(updatedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.105",
                            message: "success",
                            data: updatedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.106",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.107",
                error: err
            })
        })
}