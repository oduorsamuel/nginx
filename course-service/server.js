const express = require('express')
const mongoose = require('mongoose')
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors=require('cors');
app.use('/uploads', express.static('uploads'));
//routes to handle requests
var course= require('./routes/Courses');
var lesson= require('./routes/Lesson');
var lessonPart=require('./routes/lessonPart');
var lessonPartContent=require('./routes/lessonPartContent');
var lessonQuestion=require('./routes/lessonQuestions')
var lessonQuestionsAnswers= require('./routes/lessonQuestionsAnswers')
var lessonAnswerResults=require('./routes/lessonQuestionAnswerResult')


mongoose.connect('mongodb://mongo:27017/Course', { useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
})

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/v1/courses', course );
app.use('/v1/lessons', lesson );
app.use('/v1/lessonpart', lessonPart );
app.use('/v1/lessonpartcontent',lessonPartContent);
app.use('/v1/lessonquestions',lessonQuestion);
app.use('/v1/lessonquestionanswers',lessonQuestionsAnswers)
app.use('/v1/lessonquestionanswerresults',lessonAnswerResults)



//morgan error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

app.listen(3000, () => console.log('Server running on port 3000'));
