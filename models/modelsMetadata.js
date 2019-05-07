var mongoose = require('mongoose');

var metadataSchema = new mongoose.Schema({
  model_name: {type:String, text: true},
  framework:{type:String, text: true},
  size:{type:String, text: true},
  epochs:{type:String, text: true},
  layersCount:{type:String, text: true},
  InputTensors:{type:String, text: true},
  OutputTensor:{type:String, text: true},
  Optimizer:{type:String, text: true},
  LossFunction:{type:String, text: true},
  AccuracyValue:{type:String, text: true},
  LossValue:{type:String, text: true},
  Year:{type:String, text: true},
  Rating:{type:String, text: true},
  experiment: {type:String, text: true},
  Author: {type:String, text: true},
  categoryID: {type:String, text: true}
});

metadataSchema.index({Author: 'text', model_name: 'text', categoryID: 'text'});

const modelsMetadata = mongoose.model('modelsmetadatas',metadataSchema);
module.exports = modelsMetadata;
