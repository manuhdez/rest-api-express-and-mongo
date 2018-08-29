'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');

// Middleware functions
app.use(logger("dev"));
app.use(jsonParser());

// Mongoose
mongoose.connect('mongodb://localhost:27017/qa', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error', err);
});

db.once('open', () => {
  console.log('Conected succesfully');
  // all database comunication goes here
});

// Allowing cors
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/questions', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// Server listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});