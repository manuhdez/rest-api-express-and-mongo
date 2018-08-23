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
// create a new question
router.post('/', (req, res) => {
  res.json({
    response: "You created a new question",
    body: req.body
  });
});

// GET /questions/:id
// return an specific question
router.get('/:qID', (req, res) => {
  res.json({
    response: `You sent a request to question ${req.params.qID}`
  });
});

// POST /questions/:id/answers
// create a new answer
router.post('/:qID/answers', (req, res) => {
  res.json({
    response: "You created a new answer",
    questionId: req.params.qID,
    body: req.body
  });
});

// PUT /questions/:qID/answers/:aID
// Edit specific answer
router.put('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: "You edited a specific answer",
    questionId: req.params.qID,
    answerId: req.params.aID,
    body: req.body
  })
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: "You deleted a specific answer",
    questionId: req.params.qID,
    answerId: req.params.aID
  })
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Delete a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
  if (req.params.dir.search(/^(up|down)$/) === -1) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
}, (req, res) => {
  res.json({
    response: `You voted ${req.params.dir} to the answer ${req.params.aID}`,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
  })
});

module.exports = router;