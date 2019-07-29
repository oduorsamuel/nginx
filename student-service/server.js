const express = require('express')
const mongoose = require('mongoose')
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const Parser = require('redis-parser');
const cors=require('cors');

//routes to handle requests
var lessonresults= require('./routes/lessonResults');
var progress=require('./routes/progress')


mongoose.connect('mongodb://mongo:27017/Course', { useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
})

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(Parser)

app.use(cors());

app.use('/v1/lessonresults', lessonresults );
app.use('/v1/progress',progress);



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
