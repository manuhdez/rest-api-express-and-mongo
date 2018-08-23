'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const jsonParser = require('body-parser').json;
const logger = require('morgan');

// Middleware functions
app.use(logger("dev"));
app.use(jsonParser());
app.use('/questions', routes);

// Server listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});