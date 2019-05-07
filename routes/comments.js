const express =require('express');
const commentsRoute = express.Router();
const commentsModel = require('../models/comments');


//POST route for updating data
commentsRoute.post('/postComments', function (req, res, next) {
  let comments = new commentsModel(req.body);
  comments.postedDate = new Date();
  console.log('Comment at Router', comments);
  commentsModel.create(comments)
    .then(comments => {
      res.status(200).json({message: 'Result: Comment added successfully'});
      console.log('Comments After DB', comments);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
commentsRoute.get('/getAllComments/:modelID', function (req, res, next) {
  commentsModel.find({"modelID": req.params.modelID}, function (err, data) {
    if (err) console.log(err);
    console.log(req.params.modelID);
    var comments = data;
    console.log(comments);
    res.json(data);
  }).lean().exec();
});

module.exports = commentsRoute;
