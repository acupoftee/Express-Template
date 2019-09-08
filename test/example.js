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

  before(async () => {
    await Example.deleteMany({})
    const record = await Example.create(exampleParams)
    exampleId = record._id
  })

  // test GET /examples
  // should return all available examples in an array
  describe('GET /examples', () => {
    it('should get all examples', done => {
      chai.request(server)
        .get('/examples')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.examples.should.be.a('array')
          res.body.examples.length.should.eql(1)
          done()
        })
    })
  })

  // test GET /examples/:id
  // should get one example
  describe('GET /examples/:id', () => {
    it('should get one example', done => {
      chai.request(server)
      .get(`/examples/${exampleId}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.example.should.be.a('object')
        res.body.example.first_name.should.eql('Angela')
        done()
      })
    })
  })

  // test PATCH /examples/:id
  // should update properties of a resource
  // should not overwrite fields with empty strings
  // should return the updated proeprty with a GET request
  describe('PATCH /examples:id', () => {
    let exampleId

    const newFields = {
      first_name: 'Captain',
      last_name: 'Amari'
    }

    before(async () => {
      const record = await Example.create(newFields)
      exampleId = record._id
    })

    it('should update fields', done => {
      chai.request(server)
        .patch(`/examples/${exampleId}`)
        .send({ example: newFields })
        .end((err, res) => {
          res.should.have.status(204)
          done()
        })
    })

    it('should show resource with updated fields', done => {
      chai.request(server)
        .get(`/examples/${exampleId}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.example.should.be.a('object')
          res.body.example.first_name.should.eql(newFields.first_name)
          res.body.example.last_name.should.eql(newFields.last_name)
          done()
        })
    })

    it('should not overwrite fields with empty strings', done => {
      chai.request(server)
        .patch(`/examples/${exampleId}`)
        .send({example: { first_name: 'Ana', last_name: '' }})
        .then(() => {
          chai.request(server)
          .get(`/examples/${exampleId}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.example.should.be.a('object')
            res.body.example.first_name.should.eql('Ana')
            res.body.example.last_name.should.eql(newFields.last_name)
            done()
          })
        })
    })
  })

  // test DELETE /examples/:id
  // should return a 404 if resource doesn't exist
  // should return 204 if resource exists
  describe('DELETE /examples/:id', () => {
    it('should return a 204 if resource is destroyed', done => {
      chai.request(server)
        .delete(`/examples/${exampleId}`)
        .end((err, res) => {
          res.should.have.status(204)
          done()
        })
    })

    it('should return a 404 if the resource doesn\'t exist', () => {
      chai.request(server)
        .delete(`/examples/${exampleId}`)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})
