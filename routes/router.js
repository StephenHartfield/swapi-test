
var express = require('express');
var router = express.Router();
var peopleRouter = require('./peopleRouter');

router.use((req, res, next) => {
  console.log("Called: ", req.path);
  next()
})

router.use('/people', peopleRouter);

module.exports = router;