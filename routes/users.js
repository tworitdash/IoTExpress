var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('user', {title: "welcome to temperature sensor data"});
});

/* var cb0 = function(req, res, next){
	console.log("cb0");
	next();
}

var cb1 = function(req, res, next){
	console.log("cb1");
	next();
}

var cb2 = function(req, res, next){
	console.log("hello from C !");
	next();
}

router.get('/example/d', [cb0, cb1, cb2], function(req, res, next){
	console.log("Next Function");
	next();
}, function(req, res){
	res.render('index', {title: "D here"});
});

var requestTime = function(req, res, next){
	req.requestTime = Date.now();
	next();
}



router.use(requestTime);

router.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
}, function(req, res, next){
	console.log('Requested Url', req.originalUrl);
	
	next();
});

router.get('/user/:id', function(req, res, next){
	if (req.params.id == 0) next('route');
	else next();
}, function(req, res, next){
	res.render('index', {title: 'Einstein'});
});

router.get('/user/:id', function(req, res, next){
	res.render('hello', {title: 'Newton', user_name: 'Tworit'});
});



router.get('/test', function(req, res){
	var responseText = 'hello world'
	responseText += 'Requested at: ' + req.requestTime + '';
	res.send(responseText);
	
}); */


module.exports = router;
