var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

//connect to db
mongoose.connect( "mongodb://localhost/bookStoreAPI", ( err ) => {console.log( "CONNECTED! :", err ? false : true ) } );
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouterv1 = require('./routes/bookv1')
var bookRouterv2 = require('./routes/bookv2');
var commentRouterv2 = require('./routes/commentv2');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/v1/book', bookRouterv1);
app.use('/api/v2/book', bookRouterv2);
app.use('/api/v2/book/:bookId/comment', commentRouterv2)

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
  res.json({msg:"error"});
});

module.exports = app;
