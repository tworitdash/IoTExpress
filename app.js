var express = require('express');
var http = require('http').createServer();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var app = express();
var io = require('socket.io')(http);
var iot = require('./routes/iot')(io);
var mongoose = require('mongoose');
var connection = require('./routes/DbConnection.js')(mongoose);

var routes = require('./routes/index');
var users = require('./routes/users')(mongoose);
var temperature = require('./routes/temperature')(iot);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true}));


//app.use('/', routes);  //default : public html
app.use('/users', users);
app.use('/temperature', temperature);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

/*
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

http.listen(3001, function(){
  console.log("WebScoket Server is on :D")
});


app.listen(3000, function(){
  console.log("listening on *3000")
});
