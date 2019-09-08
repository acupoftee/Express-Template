/**
 * Middleware for removing any key/value pairs from `req.body.foo`
 * that have an empty string as a value, e.g.
 * { example: { first_name: 'Buttercup', last_name: '' } } -> { example: { first_name: 'Buttercup' } }
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function
 */
const removeBlanks = (req, res, next) => {
  // we don't know the name of the object in `req.body`, so we'll apply this to
  // ALL objects in `req.body`
  Object.values(req.body).forEach(obj => {
    for (const key in obj) {
      if (obj[key] === '') {
        // prevent the field from being updated
        // by removing both the key and the value
        delete obj[key]
      }
    }
    next()
  })
}

module.exports = removeBlanks
