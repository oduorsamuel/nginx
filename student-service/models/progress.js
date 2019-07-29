const mongoose=require('mongoose')
const Schema=mongoose.Schema
let progresSchema=new Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Users',
        required:true
    },
    LessonNumber:{
        type:Number
    },
    Url:{
        type:String
    }
},{versionKey:false})
module.exports=Progress=mongoose.model('Progress',progresSchema);