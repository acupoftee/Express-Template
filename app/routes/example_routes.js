// Express docs: http://expressjs.com/en/api.html
const express = require('express')

const ExampleModel = require('../models/example')

const router = new express.Router()

router.get('/examples', async (req, res, next) => {
  try {
    const examples = await ExampleModel.find()
    examples.map(example => example.toObject())
    res.status(200).json({ examples })
  } catch (error) {
    next(error)
  }
})

module.exports = router
