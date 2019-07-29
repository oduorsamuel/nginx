const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema= mongoose.Schema;

let lesson=new Schema({
 Name:{
     type:String,
     required:true
 },
 Number:{
     type:Number,
     required:true   
 },
 Language:{
    type:String,
    default:null
},
Pos:{
    type:Number, 
},
 NumberOfQuestions:{
    type:Number,
    required:true 
},
PercentComplete:{
    type:String,
},
Note:{
    type:String,
    required:true 
},
 CourseId:{
     type:mongoose.Schema.Types.ObjectId, ref:'Courses',
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
lesson.plugin(AutoIncrement, {id:'lesson',inc_field: 'Pos'});
lesson.plugin(AutoIncrement,{id:'lessonId',inc_field:"Id"})
module.exports=Lessons=mongoose.model('Lessons',lesson);
