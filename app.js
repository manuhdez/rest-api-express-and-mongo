'use strict';

const express = require('express');
const app = express();

// Middleware functions
app.use((req, res, next) => {
  // Do something
  console.log(`the leaves on the trees are ${req.query.color}`);
  next();
});

// Server listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});