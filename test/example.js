process.env.TESTENV = true

// import test modules
const chai = require('chai')
const chaiHttp = require('chai-http')

const Example = require('../app/models/example')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

let exampleId

describe('Examples', () => {
  const exampleParams = {
    first_name: 'Angela',
    last_name: 'Ziegler'
  }

  // Create an example resource first
  before(done => {
    Example.deleteMany({})
      .then(() => Example.create(exampleParams))
      .then(record => {
        // save the example resource id
        exampleId = record._id
        done()
      })
      .catch(console.error)
  })

  // test GET /examples
  // should return all available examples in an array
  describe('GET /examples', () => {
    it ('should get all example resources', done => {
      chai.request(server)
        .get('/examples')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.examples.should.be.a('array')
          res.body.examples.length.should.be.eql(1)
          done()
        })
    })
  })
})
