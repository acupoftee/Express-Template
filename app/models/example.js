const mongoose = require('mongoose')

// assign a new Mongoose Schema with
// attributes in here.
const exampleSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// export the schema
module.exports = mongoose.model('Example', exampleSchema)
