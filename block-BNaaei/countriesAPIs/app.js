const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/countriesAPIs', (err) => {console.log('Connected to database: ', err ? false : true);});


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countryRouter = require('./routes/country');
const stateRouter = require('./routes/state');
const { regions } = require('country-data');

const app = express();

// var World        = require('country-state-city')
// var co = require('countryjs');
// console.log(co.all());
// var o = World.State.getStatesOfCountry("IN").map((e)=>{
//   e.country = "INDIA"
//   return e;
// })
// console.log(o)
// const w = co.all().map((e)=>{
//     let n = {};
//     if ( e.name ) {
//     n.contient = e.region;
//     n.name = String(e.name).toUpperCase();
//     n.area = e.area;
//     n.border_shares = e.borders;
//     n.population = e.population;
//     }
//     return n
// })
// console.log(w) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/country', countryRouter);
app.use('/api/v1/state', stateRouter);

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
