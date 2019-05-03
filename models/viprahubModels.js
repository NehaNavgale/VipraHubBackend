var mongoose = require('mongoose');


var fileUpload = new mongoose.Schema({
 file : 'gridfs'
});

const fileUpload = mongoose.model('viprahub',fileUpload);
module.exports = fileUpload;
