const express = require('express')
const router = express.Router();
const lessonPartController = require('../controllers/lessonPartController')

router.get('/', lessonPartController.get_all_LessonParts)
router.get('/:id', lessonPartController.get_by_id)
router.post('/', lessonPartController.post_LessonPart)
router.patch('/:id', lessonPartController.update)
router.delete('/:id', lessonPartController.delete_by_id);



module.exports = router