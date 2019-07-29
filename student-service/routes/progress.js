const express=require('express')
const router=express.Router()
const progressController=require('../controller/progressController')

router.get('/',progressController.get_all)
router.get('/:UserId',progressController.get_by_userId)
router.post('/', progressController.post)
router.patch('/:UserId',progressController.update)
module.exports=router
