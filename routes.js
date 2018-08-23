'use strict';

const express = require('express');
const router = express.Router();

// GET /questions
// return all the questions
router.get('/', (req, res) => {
  res.json({
    response: "Here goes all the questions"
  });
});

// POST /questions
// post a new question
router.post('/', (req, res) => {
  res.json({
    response: "You created a new question",
    body: req.body
  });
});

// GET /questions/:id
// return an specific question
router.get('/:id', (req, res) => {
  res.json({
    response: `You sent a request to question ${req.params.id}`
  });
});

module.exports = router;