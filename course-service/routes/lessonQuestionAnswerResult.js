const express = require('express')
const router = express.Router();

const lessonQuestionAnswerResultsController = require('../controllers/lessonQuestionAnswerResults')

router.get('/',lessonQuestionAnswerResultsController.get_all_lessons)
router.get('/:id',lessonQuestionAnswerResultsController.get_by_id)
router.post('/',lessonQuestionAnswerResultsController.post_results)
router.delete('/:id',lessonQuestionAnswerResultsController.delete_by_id)

module.exports=router