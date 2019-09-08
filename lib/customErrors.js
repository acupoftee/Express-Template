class DocumentNotFoundError extends Error {
  constructor () {
    super()
    this.name = 'DocumentNotFoundError'
    this.message = 'The provided ID does not match any documents'
  }
}

class BadParamsError extends Error {
  constructor () {
    super()
    this.name = 'BadParamsError'
    this.message = 'A required parameter was omitted from this document'
  }
}

const handle404 = doc => {
  if (!doc) {
    throw new DocumentNotFoundError()
  } else {
    return doc
  }
}

module.exports = {
  BadParamsError,
  handle404
}
