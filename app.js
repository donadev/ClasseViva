require('babel-register')({
   presets: [ 'es2015' ]
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

express.response.error = function(message) {
    return this.send({error: message, success: false});
};
express.response.success = function(data) {
    return this.send({success: true, data: data});
};
var app = express();
global._ = require("lodash");
global.BASE_PATH = "https://web.spaggiari.eu/home/app/default";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//TODO: check if wantsJSON
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.error(err);
  });
}

// production error handler
// no stacktraces leaked to user
//TODO: check if wantsJSON
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.error(err);
});


module.exports = app;
