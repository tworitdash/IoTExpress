var express = require('express');
var router = express.Router();
var policy = require('./policy.js');

/* GET home page. */
router.get('/', policy.isLoggedin, function(req, res, next) {
  res.render('temperature', { title: 'Express'});
});

module.exports = router;
