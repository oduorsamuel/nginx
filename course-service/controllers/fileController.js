const express = require('express')
const file= express.Router();
const multer = require('multer');
const mkdirp = require('mkdirp');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var type = file.mimetype;
        var typeArray = type.split("/");
        if(typeArray[0]==="text"){
            const dir = 'uploads/lessoncontent/texts'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="image"){
            const dir = 'uploads/lessoncontent/images'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="video"){
            const dir = 'uploads/lessoncontent/videos'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="audio"){
            const dir = 'uploads/lessoncontent/audio'
            mkdirp(dir, err => cb(err, dir))
        }else if(typeArray[0]==="application"){
            const dir = 'uploads/lessoncontent/documents'
            mkdirp(dir, err => cb(err, dir))
        }else{
            const dir = 'uploads/lessoncontent/others'
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