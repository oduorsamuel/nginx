const express = require('express')
const router = express.Router();

const lessonQuestionAnswersController = require('../controllers/lessonQuestionsAnswersController')

router.get('/',lessonQuestionAnswersController.get_all)
router.get('/:id',lessonQuestionAnswersController.get_by_id)
router.post('/',lessonQuestionAnswersController.post_answer)
router.delete('/:id',lessonQuestionAnswersController.delete)
router.patch('/:id',lessonQuestionAnswersController.update)
module.exports=router