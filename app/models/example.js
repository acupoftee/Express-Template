const mongoose = require('mongoose')

// assign a new Mongoose Schema with
// attributes in here.
const exampleSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  }
}, {
  timestamps: true
})

// export the schema
module.exports = mongoose.model('Example', exampleSchema)
