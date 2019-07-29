const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema= mongoose.Schema;

let questionSchema=new Schema({
 LessonId: {
     type: mongoose.Schema.Types.ObjectId, ref: 'Lessons',
     required: true
    },
 CourseId:{
     type:String,  
     required:true
 },
 Text:{
     type:String,
     required:true
 },
 Mandatory:{
     type:Number,
     required:true
 },
Language:{
    type:String,
    default:null
},
Pos:{
    type:Number
},
SpeakFile:{
    type:String,
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
},
{ versionKey: false })
questionSchema.plugin(AutoIncrement, {id:'question',inc_field: 'Pos'});
questionSchema.plugin(AutoIncrement,{id:'questionId',inc_field:"Id"});
module.exports=Question=mongoose.model('LessonQuestion',questionSchema);
