var express = require('express');
var router = express.Router();
var uploadFile = require('../models/upload.js');
var upload = require('../services/upload.service');

router.post('/', function(req, res, next) {
  upload(req, res, function(err){
    if(err) {
      console.log("Error in uploading file : "+err);
      return res.status(501).json({error : err})
    }

    var uploadmodel = new uploadFile({
      name: 'category name',
      categoryId: 'category id',
      fileReferenceID: req.file.id
    });

    uploadmodel.save(function(error){
      if(error){
        throw error;
      }
    });

    res.json({
      originalname : req.file.originalname,
      uploadname: req.file.filename
    })
  })
});

module.exports = router;
