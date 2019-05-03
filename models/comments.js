const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
  comments:{
    type: String,
  },
  modelID:{
    type: String,
  },
  postedDate:{
    type: Date,
  },
  emailID: {
    type: String,
  },
  fullName: {
    type : String,
  },
});
const comments = mongoose.model('comments', commentsSchema);
module.exports = comments;
