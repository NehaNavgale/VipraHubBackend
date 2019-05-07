const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
  modelID:{
    type: String,
  },
  rating:{
    type: Number,
  },
  emailID: {
    type: String,
  },
  fullName: {
    type : String,
  },
});
const ratings = mongoose.model('ratings', ratingSchema);
module.exports = ratings;
