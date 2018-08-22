'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;

// Middleware functions
app.use(jsonParser());

// Server listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});