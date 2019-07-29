const mongoose=require('mongoose')
const Autoincreament=require('mongoose-sequence')(mongoose);
const Schema=mongoose.Schema

let questionsAnswers=new Schema({
    Id:{
        Type:Number
    },
    LessonQuestionId:{
        type:mongoose.Schema.Types.ObjectId,ref:'LessonQuestion',
        required:true 
    },
    LessonId:{
        type:String,
        required:true
    },
    CourseId:{
        type:String,
        required:true
    },
    Text:{
        type:String,
        required:true
    },
    RightAnswer:{
        type:Number,
        required:true
    },
    Language: {
        type: String,
        default: null
    },
    Type: {
        type: String,
        required:true
    },
    OrderNumber: {
        type: Number,
        required:true
    },
    GroupText: {
        type: String,
        required:true
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
questionsAnswers.plugin(Autoincreament,{id:'lessonQuestionAnswers', inc_field:'Id'});
module.exports=LessonQuestionsAnswers=mongoose.model('LessonQuestionsAnswers',questionsAnswers)