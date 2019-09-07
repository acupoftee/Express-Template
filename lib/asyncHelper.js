// https://gist.github.com/Abazhenov/e5facb8af95bae0b65607c0e028b6eb8#file-asyncmiddleware-js
const asyncHelper = routeFunction =>
  (req, res, next) => {
    Promise.resolve(routeFunction(req, res, next)).catch(next)
  }

module.exports = asyncHelper
