const mongoose = require('mongoose')

// assign a new Mongoose Schema with
// attributes in here.
const exampleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// export the schema
module.exports = mongoose.model('Example', exampleSchema)
