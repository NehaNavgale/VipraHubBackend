const express =require('express');
const ratingRoute = express.Router();
const ratingsModel = require('../models/rating');
const metaDataModel = require('../models/modelsMetadata')



//POST route for updating data
ratingRoute.post('/postRating', function (req, res, next) {
  let rating = new ratingsModel(req.body);
  ratingsModel.create(rating)
    .then(rating => {
      res.status(200).json({message: 'Result: Rating added successfully'});
      console.log('Ratings After DB', rating);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
//get average rating of an experiment
ratingRoute.get('/getAllRatings/:modelID', function (req, res, next) {
  /*ratingsModel.find({"modelID": req.params.modelID}, function (err, data) {*/
  ratingsModel.aggregate(
    [
      {
        $group : {
          _id : "$modelID",
          AvgRating : {$avg : "$rating"},    //counts the number
        }
      }
    ],  function (err, data){
                   console.log(data);
                    if (err) console.log(err);
                      /*console.log(req.params.modelID);*/
                    console.log(data);
                    res.json(data);
    });

})


module.exports = ratingRoute;

