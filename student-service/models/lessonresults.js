const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema= mongoose.Schema;

let LessonResultSchema=new Schema({
UserId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Users',
        required:true
 },
LessonId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Lessons',
        required:true
 },
 IsPassed:{
    type: Boolean
 },
 QuestionsPassed:{
     type:Number
 },
 QuestionsFailed:{
     type:Number
 },
 Timestamp:{
    type:Date,
    default:Date.now() 
},
Filename:{
    type:String,
    default:null
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
},
{ versionKey: false })
LessonResultSchema.plugin(AutoIncrement,{id:'lessonResults',inc_field:"Id"})
module.exports=LessonResults=mongoose.model('LessonResults',LessonResultSchema);