var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');




var uporabnikiRouter = require('./routes/uporabniki');
var kordinateRouter = require('./routes/kordinate');
var potovanjeRouter = require('./routes/potovanje');
var slikaRouter = require('./routes/slika');
var slikazsordinatomRouter = require('./routes/slikazkordinatom');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


app.use('/uporabniki',cors(), uporabnikiRouter);
app.use('/kordinate',cors(), kordinateRouter);
app.use('/potovanje', cors(), potovanjeRouter);
app.use('/slika', cors(), slikaRouter);
app.use('/slikazkordinatom',cors(), slikazsordinatomRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
