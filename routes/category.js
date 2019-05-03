var express = require('express');
var router = express.Router();
var categories = require('../models/categories.js');

router.get('/', function (req, res, next) {
  console.log("hai");
  categories.find(function (err, data) {
    if (err) console.log(err);
    res.json(data);
  });
});

router.post('/', function (req, res, next) {
  categories.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
