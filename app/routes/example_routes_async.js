// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// Import our example model
const Example = require('../models/example')

// middleware for removing blank object fields
const removeBlankFields = require('../middleware/removeBlankFields')

// Instantiate a new router to handle request routes
const router = express.Router()

/**
 * Create a new example resource:
 * POST /examples
 */
router.post('/examples', async (req, res, next) => {
  try {
    // Create a new Example resource with the passed in Example object
    const example = await Example.create(req.body.example)

    // return a "201: Created" status, followed by the new example json
    res.status(201).json({ example: example.toObject() })
  } catch (error) {
    // handle error
    res.sendStatus(422)
    next()
  }
})

/**
 * Index all resources:
 * GET /examples
 */
router.get('/examples', async (req, res, next) => {
  try {
    // Find all resources
    const examples = await Example.find()

    // Serialize all resources
    examples.map(example => example.toObject())

    // Send a 200 status and JSON of the resources
    res.status(200).json({ examples: examples })
  } catch (error) {
    // handle error
    next()
  }
})

/**
 * Show one resource:
 * GET /examples/5a7db6c74d55bc51bdf39793
 */
router.get('/examples/:id', async (req, res, next) => {
  try {
    // Find the resource by its ID
    const example = await Example.findById(req.params.id)

    // Send a 200 status and JSON of the resource
    res.status(200).json({ example: example.toObject() })
  } catch (error) {
    // handle error
    next()
  }
})

/**
 * Update one resource:
 * PATCH /examples/5a7db6c74d55bc51bdf39793
 */
router.patch('/examples/:id', removeBlankFields, async (req, res, next) => {
  try {
    // Find the resource by its ID
    const example = await Example.findById(req.params.id)

    // Update the resource with the new data
    await example.updateOne(req.body.example)

    // Send a 204 if the update was successful
    res.sendStatus(204)
  } catch (error) {
    // handle error
    next()
  }
})

/**
 * Destroy a resource
 * DELETE /examples/5a7db6c74d55bc51bdf39793
 */
router.delete('/examples/:id', async (req, res, next) => {
  try {
    // Find the resource by its ID
    const example = await Example.findById(req.params.id)

    // Delete the resource
    await example.deleteOne()

    // Send a 204 if the resource was successfully deleted
    res.sendStatus(204)
  } catch (error) {
    // handle error
    next()
  }
})

module.exports = router
