const express = require('express');
const viewModelRouter = express.Router();
const modelsMetadata = require('../models/modelsMetadata');
/*
modelObj =
  {
    ModelId:1,
    Overview : {
      DESCRIPTION: 'SqueezeNet begins with a standalone convolution layer (conv1',
      APPLICATION:'ImageNet',
      TASK: 'Classification: ImageNet classification',
      TYPE: 'Supervised learning',
      ARCHITECTURE : 'Convolutional Neural Network (CNN)'
    },
    Publication :{
      TITLE: 'SqueezeNet: AlexNet-level accuracy with 50x fewer parameters and <0.5MB model size',
      AUTHORS: 'Forrest N. Iandola, Song Han, Matthew W. Moskewicz, Khalid Ashraf, William J. Dally, Kurt Keutzer',
      ABSTRACT: 'Recent research on deep neural networks has focused primarily on',
      YEAR: '2016'

    },
    Architecture : {
      URL:"http://localhost:4000/uploadToMongo/chunks/ahhgshgs"
    }
  }
*/

viewModelRouter.get('/', function(req, res, next){
  modelsMetadata.findById({"_id": '5c8dd4120004b43a63200588'}, function (err,post){
    if (err) return next(err);
    var data = post;
    data.URL = "http://localhost:4000/uploadToMongo/chunks/ahhgshgs";
    /*console.log(data);*/
    res.json(data);
  }).lean().exec();
});
/*viewModelRouter.get('/', function (req, res, next) {
  console.log('Hi');
  console.log(this.modelObj);
  return res.json(this.modelObj);

})*/

module.exports = viewModelRouter;
