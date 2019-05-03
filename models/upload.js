//upload schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
  userId: {
    type: String
  },
  name: {
    type: String
  },
  categoryId: {
    type: String
  },
  experiment: {
    type: String
  },

  fileReferenceIDs: [
    Schema.Types.ObjectId
  ],
  metaID:{
    type: String
  }
});

const uploadFile =  mongoose.model('uploads', UploadSchema);
module.exports = uploadFile;

// //upload schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// var ExperimentSchema = new Schema({ name: String, fileReferenceIDs: [Schema.Types.ObjectId] });

// const UploadSchema = new Schema({
//   userId: {
//     type: String
//   },
//   name: {
//     type: String
//   },
//   categoryId: {
//     type: String
//   },
//   experiments: [ExperimentSchema]
// });

// const uploadFile =  mongoose.model('uploads', UploadSchema);
// module.exports = uploadFile;
