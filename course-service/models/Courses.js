const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema= mongoose.Schema;

let Course=new Schema({
 Name:{
     type:String,
     required:true   
 },
 Shortname:{
     type:String,  
     required:true
 },
 Description:{
     type:String,
     required:true
 },
 Note:{
     type:String,
     required:true
 },
 QuestionIntro:{
     type:String,
     required:true
 },
 ValidForPeriod:{
    type:Number,
    required:true 
},
Language:{
    type:String,
    default:null
},
NumberOfQuestions:{
    type:Number,
    required:true
},
Picture:{
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
Course.plugin(AutoIncrement,{inc_field:"Id"})
module.exports=Courses=mongoose.model('Courses',Course);