const mongoose= require('mongoose')
const autoIncrement=require('mongoose-sequence')(mongoose)
const Schema= mongoose.Schema

let resultSchema=new Schema({
Id:{
    type:Number
},
UserId:{
    type:String,
    required:true
},
LessonId:{
    type:String,
    required:true
},
QuestionId:{
    type:mongoose.Schema.Types.ObjectId,ref:'LessonQuestion'
},
TimeStamp:{
    type:Date,
    default:Date.now()
},
CourseId:{
    type:String,
    default:0
},
UserAnswerId:{
    type:Number,
    default:0
},
IsCorrect:{
    type:Number,
    default:0
},
Attempt:{
    type:Number,
    default:0 
},
OrderNumber:{
    type:Number,
    default:0 
},
IsDeleted: {
    type: Number,
    default: 0
},
 DeletedAt:{
    type:Date,  
    default:null
},
DeletedBy:{
    type:String,  
    default:null
},
UpdatedAt:{
    type:Date,  
    default:null
},
 UpdatedBy:{
     type:String,
     default:null
 }
},{versionKey:false})
resultSchema.plugin(autoIncrement,{id:'resultId',inc_field:"Id"});
module.exports=LessonQuestionAnswerResult=mongoose.model('LessonQuestionAnswerResult',resultSchema)