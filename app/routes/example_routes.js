// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// Express Async Handler docs: https://www.npmjs.com/package/express-async-handler
const asyncHelper = require('express-async-handler')

// Import our example model
const Example = require('../models/example')

// Instantiate a new router to handle request routes
const router = new express.Router()

// CREATE
// POST /examples
router.post('/examples', asyncHelper(async (req, res, next) => {
  const example = await Example.create(req.body.example)
  res.status(201).json({ example: example.toObject() })
}))

// INDEX
// GET /examples
router.get('/examples', asyncHelper(async (req, res, next) => {
  const examples = await Example.find()
  examples.map(example => example.toObject())
  res.status(200).json({ examples: examples })
}))

// SHOW
// GET /example/some_id_number
router.get('/examples/:id', asyncHelper(async (req, res, next) => {
  const example = await Example.findById(req.params.id)
  res.status(200).json({ example: example.toObject() })
}))

// UPDATE
// PATCH /examples/some_id_number
router.patch('/examples/:id', asyncHelper(async (req, res, next) => {
  const example = await Example.findById(req.params.id)
  example.updateOne(req.body.example)
  res.sendStatus(204)
}))

// DESTROY
// DELETE /examples/some_id_number
router.delete('/examples/:id', asyncHelper(async (req, res, next) => {
  const example = await Example.findById(req.params.id)
  example.deleteOne()
  res.sendStatus(204)
}))
module.exports = router
