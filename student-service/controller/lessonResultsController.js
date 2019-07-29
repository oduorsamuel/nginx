// const Results = require("../models/lessonresults")
// //redis cache
// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'localhost');

// exports.get_all = (req, res) => {
//     const cachedResults = 'lessonresults';
//     redis.get(cachedResults, function (err, results) {
//         if (results) {
//             res.json({ 
//                 status: "ok",
//                 code: "200.5.0",
//                 message: "records from redis",
//                 data: JSON.parse(results) })
//         }
//         else {
//             Results.find()
//                 .select('-IsDeleted -DeletedBy -DeletedAt -UpdatedBy -UpdatedAt -_id')//specify fields not to select
//                 .exec()
//                 .then(lessonresults => {
//                     if (lessonresults < 1) {
//                         res.json({
//                             status: "ok",
//                             code: "200.5.0",
//                             message: "no records"
//                         })
//                     } else {
//                         redis.setex(cachedResults, 10, JSON.stringify(lessonresults))
//                         res.json({
//                             status: "ok",
//                             code: "200.5.1",
//                             message: "success",
//                             data: lessonresults

//                         })
//                     }
//                 })
//                 .catch(err => {
//                     res.json({
//                         status: "bad request",
//                         code: "200.5.3",
//                         error: err
//                     })
//                 })
//         }
//     })
// }
// exports.get_by_id = (req, res) => {
//     const cacheddata = req.params.id
//     redis.get(cacheddata, function (err, response) {
//         if (response) {
//             res.json({ 
//                 status: "ok",
//                 code: "200.5.4",
//                 message: "records from redis",
//                 data: JSON.parse(response) })
//         }
//         else {
//             Results.findById(req.params.id)
//                 .select()//specify fields not to select
//                 .exec()
//                 .then(lessonresult => {
//                     if (lessonresult < 1) {
//                         res.json({
//                             status: "ok",
//                             code: "200.5.4",
//                             message: "no record found"
//                         })
//                     } else {
//                         redis.setex(cacheddata, 10, JSON.stringify(lessonresult))
//                         res.json({
//                             status: "ok",
//                             code: "200.5.5",
//                             message: "success",
//                             data: lessonresult
//                         })
//                     }
//                 })
//                 .catch(err => {
//                     res.json({
//                         status: "ok",
//                         code: "200.5.6",
//                         error: err
//                     })
//                 })
//         }
//     })
// }

// exports.post = (req, res) => {
//     if (req.file) {
//         console.log(req.file)
//         req.body.Filename = req.file.filename
//     } else {
//         req.body.Filename = ''
//     }
//     const userResults = new Results({
//         UserId: req.body.UserId,
//         LessonId: req.body.LessonId,
//         IsPassed: req.body.IsPassed,
//         QuestionsPassed: req.body.QuestionsPassed,
//         QuestionsFailed: req.body.QuestionsFailed,
//         Filename: req.body.Filename,
//     })
//     userResults.save()
//         .then(savedresults => {
//             res.json({
//                 status: "created",
//                 code: "201.5.6",
//                 message: "success",
//                 data: savedresults
//             })
//         })
//         .catch(err => {
//             res.json({
//                 status: "bad request",
//                 code: "400.5.7",
//                 error: err,
//             })
//         })
// }
// exports.delete_by_id = (req, res) => {
//     Results.findById(req.params.id)
//         .exec()
//         .then(response => {
//             if (response < 1) {
//                 res.json({
//                     status: "ok",
//                     code: "200.5.8",
//                     message: "record not found"
//                 })
//             } else {
//                 response.UserId = response.UserId,
//                     response.LessonId = response.LessonId,
//                     response.IsPassed = response.IsPassed,
//                     response.QuestionsPassed = response.QuestionsPassed,
//                     response.QuestionsFailed = response.QuestionsFailed,
//                     response.Timestamp = response.Timestamp,
//                     response.Filename = response.Filename,
//                     response.IsDeleted = 1,
//                     response.DeletedBy = "Dev",
//                     response.DeletedAt = Date.now()
//                 response.save()
//                     .then(deletedData => {
//                         res.json({
//                             status: "ok",
//                             code: "200.5.9",
//                             message: "success",
//                             data: deletedData
//                         })
//                     })
//                     .catch(err => {
//                         res.json({
//                             status: "bad request",
//                             code: "400.5.10",
//                             error: err
//                         })
//                     })
//             }
//         })
//         .catch(err => {
//             res.json({
//                 status: "bad request",
//                 code: "400.5.11",
//                 error: err
//             })
//         })
// }
// exports.update = (req, res) => {
//     Results.findById(req.params.id)
//         .exec()
//         .then(response => {
//             if (response < 1) {
//                 res.json({
//                     status: "ok",
//                     code: "200.5.12",
//                     message: "record not found"
//                 })
//             } else {
//                 if (!req.file) {
//                     req.body.Filename = response.Filename
//                 } else if (req.file) {
//                     req.body.Filename = req.file.filename
//                     req.body.QuestionsPassed = ''
//                     req.body.QuestionsFaile = ''
//                 }
//                 response.UserId = response.UserId,
//                     response.LessonId = req.body.LessonId,
//                     response.IsPassed = req.body.IsPassed,
//                     response.QuestionsPassed = req.body.QuestionsPassed,
//                     response.QuestionsFailed = req.body.QuestionsFailed,
//                     response.Timestamp = response.Timestamp,
//                     response.Filename = req.body.Filename,
//                     response.UpdatedBy = "Dev",
//                     response.UpdatedAt = Date.now()
//                 response.save()
//                     .then(updatedData => {
//                         res.json({
//                             status: "ok",
//                             code: "200.5.13",
//                             message: "success",
//                             data: updatedData
//                         })
//                     })
//                     .catch(err => {
//                         res.json({
//                             status: "bad request",
//                             code: "400.5.14",
//                             error: err
//                         })
//                     })
//             }
//         })
//         .catch(err => {
//             res.json({
//                 status: "bad request",
//                 code: "400.5.15",
//                 error: err
//             })
//         })
// }