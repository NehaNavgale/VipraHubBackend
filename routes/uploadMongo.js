var express = require('express');
var router = express.Router();
let multer = require('multer');
var upload= require('../services/uploadMongo.service');
var uploadFile = require('../models/upload');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var path = require('path');
const fs = require('fs');
var Archiver = require('archiver');

router.post('/models', (req,res) => {
  console.log(req.body);

  uploadFile.create(req.body, function (err, post) {
    if (err) return console.log("Error in creating model : "+err);
    res.json(post);
  });
});

router.get('/models', function (req, res, next) {
  console.log('inside models')
  var name = req.query.name;
  var userID = req.query.userID;
  var experiment = req.query.experiment;

  // console.log(name)
  // console.log(userID)
  console.log(experiment)

  if ((name != undefined && name != "" && name != null) && (userID != undefined && userID != "" && userID != null)){
    console.log('both name and userID are given')
    uploadFile.find({"name": name, "userId": userID}, function (err,post){
      if (err) return next(err);
      console.log(post)
      res.json(post);
    });
  } else if ((userID != undefined && userID != "" && userID != null) && (experiment == undefined) ){
    console.log('userId is given')
    uploadFile.find({"userId": userID}, function (err,post){
      if (err) return next(err);
      console.log(post)
      res.json(post);
    });
  } else if((userID != undefined && userID != "" && userID != null) && (experiment != undefined && experiment != "" && experiment != null)) {
    console.log('when experiment is given')
    uploadFile.find({"userId": userID, "experiment": experiment}, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  } else if((name == undefined ) && (userID == undefined)) {
    console.log('name and userId are not given')
    uploadFile.find(function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  }
});

router.get('/models/:name', function(req, res, next){
  console.log("inside routes for uploadMongo")
  uploadFile.find({"name": req.params.name}, function (err,post){
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/files', (req, res) => {
  upload(req,res, (err) => {
    if(err){
      console.log("Error in uploading file : "+err);
      return res.status(501).json({error : err});
    }
    res.json({error_code:0, error_desc: null, file_uploaded: true, file_id: req.file.id});
  });
});

router.get('/files/:fileReferenceID', function(req, res, next){
  console.log("inside routes for fileReferenceID")
  let filesData = [];
  let count = 0;

  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into

  gfs.files.find({}).toArray((err, files) => {
    // Error checking
    if(!files || files.length === 0){
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    res.json(files.filter((file) => file._id == req.params.fileReferenceID ));
  });
});

router.get('/chunks/:fileName', function(req, res, next){
  console.log(req.params)
  console.log("inside routes for fileID")
  let filesData = [];
  let count = 0;

  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into
  console.log(req.params.fileID);
  gfs.files.findOne({ filename: req.params.fileName }, (err, file) => {
    // Check if the input is a valid image or not
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // If the file exists then check whether it is an image
    // if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    // Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    console.log("file content ====================")
    console.log(file);
    res.set('Content-Type', file.contentType)
    readstream.pipe(res);
    // } else {
    //   res.status(404).json({
    //     err: 'Not an image'
    //   });
    // }
  });
});


router.get('/zipfiles', (req, response) => {

  response.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=myFile.zip'
  });
  var zip = Archiver('zip');

  // Send the file to the page output.
  zip.pipe(response);

  // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
  // zip.append('Some text to go in file 1.', { name: '1.txt' })
  //   .append('Some text to go in file 2. I go in a folder!', { name: 'somefolder/2.txt' })
  //   .file('./routes/input.txt', { name: '3.txt' })
  //   .finalize();
  zip.directory('../uploads/', false)
    .finalize();

  //res.download("./routes/input.txt");


});

// Route for getting all the files
router.get('/files', (req, res, next) => {
  console.log("inside files donwload endpoint-----")
  let filesData = [];
  let count = 0;

  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into

  gfs.files.find({}).toArray((err, files) => {
    // Error checking
    if(!files || files.length === 0){
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }

    // Loop through all the files and fetch the necessary information
    files.forEach((file) => {
      filesData[count++] = {
        id: file._id,
        filename: file.filename,
        contentType: file.contentType
      }
    });
    console.log(filesData)
    res.json(filesData);
  });
});


module.exports = router;
