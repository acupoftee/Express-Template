// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// Import our example model
const Example = require('../models/example')

// middleware for removing blank object fields
const removeBlankFields = require('../middleware/removeBlankFields')

// add custom error handlers
const handle404 = require('../../lib/customErrors').handle404

// Instantiate a new router to handle request routes
const router = express.Router()

/**
 * Create a new example resource:
 * POST /examples
 */
router.post('/examples', (req, res, next) => {
  // Create a new Example resource with the passed in Example object
  Example.create(req.body.example)
    .then(example => {
      // return a "201: Created" status, followed by the new example json
      res.status(201).json({ example: example.toObject() })
    })
    // handle error if present
    .catch(next)
})

/**
 * Index all resources:
 * GET /examples
 */
router.get('/examples', (req, res, next) => {
  // Find all resources
  Example.find()
    .then(examples => {
      // serialize all resources
      return examples.map(example => example.toObject())
    })
    // Send a 200 status and JSON of the resources
    .then(examples => res.status(200).json({ examples: examples }))
    // handle error if present
    .catch(next)
})

/**
 * Show one resource:
 * GET /examples/5a7db6c74d55bc51bdf39793
 */
router.get('/examples/:id', (req, res, next) => {
  // Find the resource by its ID
  Example.findById(req.params.id)
    // Send a 200 status and JSON of the resource
    .then(example => res.status(200).json({ example: example.toObject() }))
    // handle error
    .catch(next)
})

/**
 * Update one resource:
 * PATCH /examples/5a7db6c74d55bc51bdf39793
 */
router.patch('/examples/:id', removeBlankFields, (req, res, next) => {
  // Find the resource by its ID
  Example.findById(req.params.id)
    // Update the resource with the new data
    .then(example => example.updateOne(req.body.example))
    // Send a 204 if the update was successful
    .then(() => res.sendStatus(204))
    // handle error
    .catch(next)
})

/**
 * Destroy a resource
 * DELETE /examples/5a7db6c74d55bc51bdf39793
 */
router.delete('/examples/:id', (req, res, next) => {
  // Find the resource by its ID
  Example.findById(req.params.id)
    // Delete the resource
    .then(handle404)
    .then(example => example.deleteOne())
    // Send a 204 if the resource was successfully deleted
    .then(() => res.sendStatus(204))
    // handle error
    .catch(next)
})

module.exports = router
