// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// Express Async Handler docs: https://www.npmjs.com/package/express-async-handler
const asyncHelper = require('express-async-handler')

// Import our example model
const Example = require('../models/example')

const removeBlankFields = require('../middleware/removeBlankFields')

// Instantiate a new router to handle request routes
const router = express.Router()

/**
 * Create a new example resource:
 * POST /examples
 *
 * If there was an error, `asyncHelper` will reject the promise, and
 * Express will throw an eror
 */
router.post('/examples', asyncHelper(async (req, res, next) => {
  // Create a new Example resource with the passed in Example object
  const example = await Example.create(req.body.example)

  // return a "201: Created" status, followed by the new example json
  res.status(201).json({ example: example.toObject() })
}))

/**
 * Index all resources:
 * GET /examples
 *
 * If there was an error, `asyncHelper` will reject the promise, and
 * Express will throw an eror
 */
router.get('/examples', asyncHelper(async (req, res, next) => {
  // Find all resources
  const examples = await Example.find()

  // Serialize all resources
  examples.map(example => example.toObject())

  // Send a 200 status and JSON of the resources
  res.status(200).json({ examples: examples })
}))

/**
 * Show one resource:
 * GET /examples/5a7db6c74d55bc51bdf39793
 *
 * If there was an error, `asyncHelper` will reject the promise, and
 * Express will throw an eror
 */
router.get('/examples/:id', asyncHelper(async (req, res, next) => {
  // Find the resource by its ID
  const example = await Example.findById(req.params.id)

  // Send a 200 status and JSON of the resource
  res.status(200).json({ example: example.toObject() })
}))

/**
 * Update one resource:
 * PATCH /examples/5a7db6c74d55bc51bdf39793
 *
 * If there was an error, `asyncHelper` will reject the promise, and
 * Express will throw an eror
 */
router.patch('/examples/:id', removeBlankFields, asyncHelper(async (req, res, next) => {
  // Find the resource by its ID
  const example = await Example.findById(req.params.id)

  // Update the resource with the new data
  example.updateOne(req.body.example)

  // Send a 204 if the update was successful
  res.sendStatus(204)
}))

/**
 * Destroy a resource
 * DELETE /examples/5a7db6c74d55bc51bdf39793
 *
 * If there was an error, `asyncHelper` will reject the promise, and
 * Express will throw an eror
 */
router.delete('/examples/:id', asyncHelper(async (req, res, next) => {
  // Find the resource by its ID
  const example = await Example.findById(req.params.id)

  // Delete the resource
  example.deleteOne()

  // Send a 204 if the resource was successfully deleted
  res.sendStatus(204)
}))

module.exports = router
