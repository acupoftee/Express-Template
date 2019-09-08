// require NPM packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files here
const exampleRoutes = require('./app/routes/example_routes')

// require middleware
const requestLogger = require('./lib/requestLogger')
const errorHandler = require('./lib/errorHandlers')

// add database config
// `db` will be the mongo URI string from `db.js`
const db = require('./config/db')

// define server and client ports
// used for cors and local port declaration
// Feel free to replace with custom ports
const serverDevPort = 4741
const clientDevPort = 7165

// establishes database connection
mongoose.Promise = global.Promise
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// instantiate an express app object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost${clientDevPort}` }))

// define the API's port
const port = process.env.PORT || serverDevPort

// add `body-parser` to parse JSON requests into
// JS objects before they reach the routes.
app.use(bodyParser.json())

// parse json requests sent by `$.ajax` which use a differnet content type
app.use(bodyParser.urlencoded({ extended: true }))

// log incoming requests for debugging
app.use(requestLogger)

// register routes
app.use(exampleRoutes)

// register error handling middleware
// this needs to comes after the route middlewares,
// because it needs to be passed any error messages from them
app.use(errorHandler)

// run the api on the designated port
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// needed for testing
module.exports = app
