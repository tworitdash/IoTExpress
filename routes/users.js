var express = require('express');
var router = express.Router();

module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
      var bcrypt   = require('bcryptjs');

  var Account = new Schema({
      email    : String,
      name     : String,
      password : String,
      role     : {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
      }
  });

  router.get('/', function(req, res, next) {
    res.render('user', {title: "welcome to temperature sensor data"});
  });

  // Create a user model with this scheme

  var User = mongoose.model('User', Account);
  var userApi = require('./rest.js')(User);

  router.get('/api/', userApi.find);
  router.get('/api/:id', userApi.findOne);
  router.all('/api/insert', userApi.insert);
  router.get('/api/destroy/:id', userApi.destroy);
  router.get('/api/update/:id', userApi.update);
  router.post('/test', function (req, res) {
    res.send(req.body);
  });
  return router;
}
