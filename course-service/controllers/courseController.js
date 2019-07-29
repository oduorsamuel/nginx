const Courses = require('../models/Courses');
exports.get_all_course = (req, res) => {
    Courses.find()
        .select()//specify fields to select here
        .exec()
        .then(result => {
            if (result < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.0",
                    message: "courses not found"
                })
            } else {
                res.json({
                    status: 'ok',
                    code: "200.4.1",
                    message: 'success',
                    data: result
                });
            }
        })
        .catch(err => {
            res.json({
                status: 'bad request',
                code: "400.4.2",
                error: err
            });
        })
}
exports.post_course = (req, res) => {
    if(!req.file){
        req.body.path="null"  
    }
    else if(req.file.mimetype.split("/")[0]==="image"){
     req.body.path=req.hostname +'/'+req.file.path
    }else{
        res.json({
            code:"400.4.2",
            message:"picture must be an image"
        })
    }
    const userData = {
        Name: req.body.Name,
        Shortname: req.body.Shortname,
        Description: req.body.Description,
        NumberOfQuestions: req.body.NumberOfQuestions,
        Note: req.body.Note,
        QuestionIntro: req.body.QuestionIntro,
        ValidForPeriod: req.body.ValidForPeriod,
        Picture: req.body.path
    }

    Courses.findOne({ Name: req.body.Name })
        .then(course => {
            if (!course) {
                Courses.create(userData)
                    .then(course => {
                        res.json({

                            status: 'created',
                            code: '201.4.3',
                            message: 'course created',
                            data: course,
                        });

                    })
                    .catch(err => {
                        res.send({
                            status: "bad request",
                            code: "400.4.4",
                            error: err
                        })
                    })

            } else {
                res.json({
                    status: "conflict",
                    code: "409.4.5",
                    error: 'Course name already exist'
                })
            }
        })
        .catch(err => {
            res.send({
                status: "bad request",
                code: "400.4.6",
                error: err
            })
        })
}

exports.get_by_id = (req, res) => {
    Courses.findById(req.params.id)
        .select()//specify fields to select here
        .exec()
        .then(results => {
            if (!results) {
                res.json({

                    status: 'ok',
                    code: "200.4.7",
                    message: 'no data found',
                })

            } else {
                res.json({

                    status: 'ok',
                    code: "200.4.8",
                    message: 'success',
                    data: results,
                })
            }
        })
        .catch(err => {
            res.json({
                status: 'bad request',
                code: "400.4.9",
                error: err,
            })
        })
}

exports.delete_by_id = (req, res) => {
    Courses.findById(req.params.id)
        .then(Courses => {
            if (Courses < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.10",
                    message: "invalid id"
                })
            }
            else {
                Courses.Name = Courses.Name;
                Courses.Shortname = Courses.Shortname;
                Courses.Description = Courses.Description;
                Courses.Note = Courses.Note;
                Courses.QuestionIntro = Courses.QuestionIntro;
                Courses.ValidForPeriod = Courses.ValidForPeriod;
                Courses.NumberOfQuestions = Courses.NumberOfQuestions;
                Courses.Picture = Courses.Picture;
                Courses.DeletedBy = "Dev";//req,params.userid
                Courses.DeletedAt = Date.now();
                Courses.IsDeleted = 1
                Courses.save()
                    .then(deletedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.11",
                            message: "success",
                            data: deletedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.12",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.13",
                error: err
            })
        })
}
exports.update = (req, res) => {
    Courses.findById(req.params.id)
        .then(Courses => {
            if (Courses < 1) {
                res.json({
                    status: "not found",
                    code: "404.4.14",
                    message: "invalid id"
                })
            }
            else {
                if(!req.file){
                    req.body.path=Courses.Picture 
                }
                else if(req.file.mimetype.split("/")[0]==="image"){
                 req.body.path=req.hostname +'/'+req.file.path
                }
                Courses.Name = req.body.Name;
                Courses.Shortname = req.body.Shortname;
                Courses.Description = req.body.Description;
                Courses.Note = req.body.Note;
                Courses.QuestionIntro = req.body.QuestionIntro;
                Courses.ValidForPeriod = req.body.ValidForPeriod;
                Courses.NumberOfQuestions = req.body.NumberOfQuestions;
                Courses.Picture = req.body.path;
                Courses.UpdatedBy = "Dev";//req,params.userid
                Courses.UpdatedAt = Date.now();
                Courses.save()
                    .then(updatedcontent => {
                        res.json({
                            status: "ok",
                            code: "200.4.15",
                            message: "success",
                            data: updatedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "400.4.16",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.17",
                error: err
            })
        })
}