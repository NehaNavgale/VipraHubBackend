var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: String
});

const categories = mongoose.model('categories',categorySchema);
module.exports = categories;
