const express=require('express');
const router= express.Router();
const lessonresultController=require('../controller/lessonResultsController')
const filecontroller=require('../controller/fileController')
router.use(filecontroller);

// router.get('/',lessonresultController.get_all)
// router.get('/:id',lessonresultController.get_by_id)
// router.post('/',upload.single('Filename'),lessonresultController.post)
// router.delete('/:id',lessonresultController.delete_by_id)
// router.patch('/:id',upload.single('Filename'),lessonresultController.update)
module.exports=router