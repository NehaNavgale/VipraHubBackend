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
  let user = new User(req.body);
  User.update(req.params.userEmail, { $set: {'uploadedModels': req.body.uploadCount} }, function (err,post){
    if (err) return next(err);
    res.json(post);
  })
})

module.exports = userRouter;
