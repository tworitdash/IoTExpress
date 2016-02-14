var express = require('express');
var router = express.Router();
var policy = require('./policy.js');


module.exports = function (iot){
	router.get('/', policy.isLoggedin, function(req, res, next) {
  		res.render('temperature', { title: 'Express'});
	});

	router.get('/:channel', policy.isLoggedin, function(req, res){
		var q = iot.BroadcastMessageToValidUser(req.params['channel'],{msg:"hello form another world.."});
		console.log(q);
		q.done(function(s){
			console.log(s);
			res.send("success");
		},function(e){
			console.log(e);
			res.send("failed");
		});
	});

	return router;
}
