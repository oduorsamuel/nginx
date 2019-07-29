const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let lessonPartContentSchema = new Schema({
    Content: {
        type: String,
        required: true
    },
    LessonPartId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'LessonPart',
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    LessonId: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    File: {
        type: String,
        // required: true
    },
    Pos: {
        type: Number,
    },
    Language: {
        type: String,
        default: null
    },
    Zindex: {
        type: Number,
        default: 540
    },
    orgfilename: {
        type: String,
    },
    x: {
        type: Number,
        default: 10
    },
    y: {
        type: Number,
        default:10
    },
    w: {
        type: Number,
        default:10
    },
    h: {
        type: Number,
        default:10
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
lessonPartContentSchema.plugin(AutoIncrement, {id:'lesson_part_content',inc_field: 'Pos'});
lessonPartContentSchema.plugin(AutoIncrement,{id:'lessonPartContentId',inc_field:"Id"});
module.exports = LessonPartContent = mongoose.model('LessonPartContent', lessonPartContentSchema);