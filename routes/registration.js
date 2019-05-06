const express =require('express');
const userRouter = express.Router();
const User = require('../models/registration');


//POST route for updating data
userRouter.post('/', function (req, res, next) {
  let user = new User(req.body);
  User.create(user)
    .then(user => {
      res.status(200).json({'Result': 'User added successfully'});
    })
    .catch(err => {
      res.status(400).send(err);
    });
})

userRouter.put('/uploadCount', function (req, res, next) {
  console.log("details " + req.body.uploadedModels)
  User.update({ emailID: req.body.emailID }, { $set: {'uploadedModels': req.body.uploadedModels} }, function (err,post){
    if (err) return next(err);
    res.json(post);
  })
})

module.exports = userRouter;
