const express = require('express')
const router = express.Router();
const file=require('../controllers/fileController')
router.use(file)
const lessonQuestionController = require('../controllers/lessonQuestionController')

router.get('/',lessonQuestionController.get_all),
router.post('/',upload.single('SpeakFile'),lessonQuestionController.post_lessonquestion)
router.delete('/:id',lessonQuestionController.delete_by_id)
router.get('/:id',lessonQuestionController.get_by_id)
router.patch('/:id',upload.single('SpeakFile'),lessonQuestionController.update)

module.exports=router