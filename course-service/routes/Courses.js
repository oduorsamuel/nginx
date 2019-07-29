const express = require('express')
const router = express.Router();
const file=require('../controllers/fileController')
router.use(file)
const courseController = require('../controllers/courseController')

router.get('/', courseController.get_all_course)
router.get('/:id', courseController.get_by_id)
router.post('/', upload.single('Picture'), courseController.post_course)
router.patch('/:id', upload.single('Picture'), courseController.update)
router.delete('/:id', courseController.delete_by_id)
module.exports = router