var express = require('express');
var fs = require('fs');
var router = express.Router();
var modelsMetadata = require('../models/modelsMetadata.js');
var usermodels = require('../models/upload.js');
var categories = require('../models/categories.js');
var upload = require('../models/upload.js');

// Model metadata CRUD


router.get('/getAllModels', function (req, res, next) {
  console.log('inside getAllModels')
  var userid = req.query.userID;
  modelsMetadata.find({"Author":userid}, function (err, data) {
    console.log(data);
    if (err) return next(err);
    res.json(data);
  });
});


router.put('/downloadCount', function (req, res, next) {
  console.log("details " + req.body.downloadedCount)
  modelsMetadata.update({ experiment: req.body.experiment }, { $set: {'downloadedCount': req.body.downloadedCount} }, function (err,post){
    if (err) return next(err);
    res.json(post);
  })
});

router.get('/getAll', function (req, res, next) {
  console.log("inside getAll");
  var q = req.query.q;
  if (q == undefined || q == "" || q == null)
  {
    modelsMetadata.aggregate([{"$sort": { "model_name": 1, "AccuracyValue": -1 } },
    { $group: {
      _id: "$model_name",
        id: {"$first": "$_id"},
      experiment: { "$first": "$experiment" },
      model_name: { "$first": "$model_name" },
      AccuracyValue: { "$first": "$AccuracyValue" },
      Author: { "$first": "$Author" },
      categoryID: { "$first": "$categoryID" },
      framework: { "$first": "$framework" },
      InputTensors: { "$first": "$InputTensors" },
      Year: { "$first": "$Year" },
        overAllRating: { "$first": "$overAllRating" },
      Optimizer: { "$first": "$Optimizer" }
    }}], function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  } else {
    modelsMetadata.aggregate([{ $match: { $or: [{"model_name": new RegExp(q, "gi")}, {"Author": new RegExp(q, "gi")},
        {"categoryID": new RegExp(q, "gi")}, {"framework": new RegExp(q, "gi")}, {"size": new RegExp(q, "gi")},
        {"epochs": new RegExp(q, "gi")}, {"layersCount": new RegExp(q, "gi")}, {"InputTensors": new RegExp(q, "gi")},
        {"OutputTensor": new RegExp(q, "gi")}, {"Optimizer": new RegExp(q, "gi")}, {"LossFunction": new RegExp(q, "gi")},
        {"AccuracyValue": new RegExp(q, "gi")},{"LossValue": new RegExp(q, "gi")},{"Year": new RegExp(q, "gi")},
        {"experiment": new RegExp(q, "gi")}, {"overAllRating": new RegExp(q, "gi")}]}},
      {"$sort": { "model_name": 1, "AccuracyValue": -1 } },
      { $group: {
          _id: "$model_name",
          id: {"$first": "$_id"},
          experiment: { "$first": "$experiment" },
          model_name: { "$first": "$model_name" },
          AccuracyValue: { "$first": "$AccuracyValue" },
          Author: { "$first": "$Author" },
          categoryID: { "$first": "$categoryID" },
          framework: { "$first": "$framework" },
          InputTensors: { "$first": "$InputTensors" },
          Year: { "$first": "$Year" },
          overAllRating: { "$first": "$overAllRating" },
          Optimizer: { "$first": "$Optimizer" }
      }}], function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  }
});


// { "$text": { "$search": q , "$caseSensitive": false} }

router.post('/', function (req, res, next) {
  modelsMetadata.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/getModels', function (req, res, next) {
   var userid = req.query.userid;
   usermodels.find({"userId":userid}, function (err, data) {
     /*console.log(data);*/
       if (err) return next(err);
       res.json(data);
     });

});

 router.get('/:categoryID', function(req, res, next){
  modelsMetadata.find({"categoryID": req.params.categoryID}, function (err,post){
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/getModel/:modelID', function(req, res, next){
  // var urls = {};
  // upload.findOne({"metaID": req.params.modelID}, function (err, data) {
  //   for(var i in data.fileReferenceIDs){
  //     upload.files.findById({"_id" : data.fileReferenceIDs[i]}, (err,file)=> {
  //
  //       if(/_architecture/.test(file.filename)){
  //         urls.Architecture  = data.fileReferenceIDs[i];
  //       }
  //       else if(/_accuracy/.test(file.filename)){
  //         urls.Architecture  = data.fileReferenceIDs[i];
  //       }
  //       else if(/_loss/.test(file.filename)){
  //         urls.Architecture  = data.fileReferenceIDs[i];
  //       }
  //       else if(/_confusion_matrix/.test(file.filename)){
  //         urls.Architecture  = data.fileReferenceIDs[i];
  //       }
  //
  //     });
  //   }
  //    //upload.files.find()
  // })
  modelsMetadata.findById({"_id": req.params.modelID}, function (err,post){
    if (err) return next(err);
    //data.URL = "http://localhost:4000/uploadToMongo/chunks/ahhgshgs";
    ///post.URL = "http://localhost:4000/uploadToMongo/chunks/ahhgshgs";
    res.json(post);
  }).lean().exec();

});


// modelsMetadata.find({"Author": userID}, function (err,post){
//   if (err) return next(err);
//   res.json(post);
// });
// console.log('inside getModelsByUserId' + userID)
// modelsMetadata.aggregate([{$match: {"Author": userID}}], function (err,post){
//   if (err) return next(err);
//   res.json(post);
// });


module.exports = router;


