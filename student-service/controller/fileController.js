const express = require('express')
const mkdirp = require('mkdirp')
const file= express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var type = file.mimetype;
        var typeArray = type.split("/");
        if(typeArray[0]==="text"){
            const dir = 'uploads/studentfiles/texts'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="image"){
            const dir = 'uploads/studentfiles/images'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="video"){
            const dir = 'uploads/studentfiles/videos'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="audio"){
            const dir = 'uploads/studentfiles/audio'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="application"){
            const dir = 'uploads/studentfiles/documents'
            mkdirp(dir, err => cb(err, dir))
        }else{
            const dir = 'uploads/studentfiles/others'
            mkdirp(dir, err => cb(err, dir))
        }

      },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname)
    },
});
upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10
        },
    })

    module.exports=file