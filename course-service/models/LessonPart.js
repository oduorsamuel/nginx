const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let lessonPartSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    LessonId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Lessons',
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required:true
    },
    Pos: {
        type: Number,
    },
    Language: {
        type: String,
        default: null
    },
    CanvasWidth: {
        type: Number,
        default: 540
    },
    CanvasHeight: {
        type: Number,
        default: 540
    },
    IsDeleted: {
        type: Number,
        default: 0
    },
    DeletedAt: {
        type: Date,
        default: null
    },
    DeletedBy: {
        type: String,
        default: null
    },
    UpdatedAt: {
        type: Date,
        default: null
    },
    UpdatedBy: {
        type: String,
        default: null
    }
},
    { versionKey: false })
lessonPartSchema.plugin(AutoIncrement, {id:'lesson_part',inc_field: 'Pos'});
lessonPartSchema.plugin(AutoIncrement,{id:'lessonPartId',inc_field:"Id"});
module.exports = LessonPart = mongoose.model('LessonPart', lessonPartSchema);