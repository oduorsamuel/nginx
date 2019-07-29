const express = require('express')
const router = express.Router();
const file=require('../controllers/fileController')
router.use(file)
const lesseonPartContentController = require('../controllers/lessonPartContentController')

router.post('/', upload.single('File'), lesseonPartContentController.post_content)
router.get('/',lesseonPartContentController.get_lesson_content_parts)
router.get('/:id',lesseonPartContentController.get_by_id)
router.patch('/:id',upload.single('File'),lesseonPartContentController.update)
router.delete('/:id',lesseonPartContentController.delete_by_id)
module.exports=router
