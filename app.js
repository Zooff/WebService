var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config.js');

//Database à refaire
var mongoose = require('mongoose');
mongoose.connect(config.database[process.env.NODE_ENV]);
var db = mongoose.connection;

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

db.on('error', console.error.bind(console, "Connection Error"));
db.on('open', function(){
  console.log("Connexion Réussi")}
);


var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('secret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/api/users', users);
app.use('/api/groups', groups);

app.use('/node_modules', express.static(__dirname + '/node_modules'));
// application -------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
