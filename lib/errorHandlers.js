/**
 * An error handling middleware that will run anytime one of the route
 * handlers calls `next`, in other words, when an error gets thrown in one of
 * the promise chains
 * @param {Error} err error
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function
 */
const errorHandler = (err, req, res, next) => {
  // don't log errors in a test environment
  if (!process.env.TESTENV) {
    // log a rudimentary timestamp
    console.log('\n', new Date().toTimeString() + ':')
    // log the original error the terminal running Express
    console.error(err)
  }

  // HTTP RESPONSES
  // there are `ValidationError`s and `ValidatorErrors`, so use a regex
  // to catch them both
  if (err.name.match(/Valid/) || err.name === 'MongoError') {
    // Throw this error if required params are missing
    const message = 'The receieved params failed a Mongoose validation'
    err = { status: 422, message }
  } else if (err.name === 'DocumentNotFoundError') {
    err.status = 404
  } else if (err.name === 'CastError' || err.name === 'BadParamsError') {
    err.status = 422
  }

  // if set a status code above, send that status code
  // otherwise, send 500. Also, send the error message as JSON.
  res.status(err.status || 500).json(err)
}

module.exports = errorHandler
