import app from '../index.js'
import request from 'supertest'
import chai from 'chai'
const expect = chai.expect

describe('/POST Login', function () {
  it('wrong username', async function() {
    const response = await request(app).post('/api/login').send({
      "pseudo":"wrong",
      "password":"wrong",
      "remember": false
    })
    expect(response.status).to.eql(404)
    expect(response.text).to.eql('Utilisateur inexistant.')
  })

  it('wrong password', async function() {
    const response = await request(app).post('/api/login').send({
      "pseudo": process.env.TEST_USER,
      "password":"wrong",
      "remember": false
    })
    expect(response.status).to.eql(404)
    expect(response.text).to.eql('Mot de passe incorrect.')
  })

  it('good login', async function() {
    const response = await request(app).post('/api/login').send({
      "pseudo": process.env.TEST_USER,
      "password":process.env.TEST_PWD,
      "remember": false
    })
    expect(response.status).to.eql(200)
    expect(response.body).to.include.keys('accessToken', 'user')
    expect(response.body.user.pseudo).to.eql(process.env.TEST_USER)
  })
})

describe('User Controllers', function () {
  const createdUser = {
    "pseudo": "jvaljean",
    "role": "customer",
    "firstname": "jean",
    "lastname": "valjean",
    "company": {
        "name": "les misérables"
    },
    "phone": "06-00-00-00-00",
    "mail": "jvaljean@test.fr"
  }
  const newUser = {
    "pseudo": "jvaljean",
    "role": "customer",
    "firstname": "jean",
    "lastname": "valjean",
    "company": {
        "name": "les misérables"
    },
    "phone": "06-00-00-00-00",
    "mail": "jvaljean@test.fr",
    "password": "misère"
  }

  before(async () => {
    const response = await request(app).post('/api/login').send({
      "pseudo": process.env.TEST_USER,
      "password":process.env.TEST_PWD,
      "remember": false
    })
    this.token = response.body.accessToken
  })

  it('/GET all user', async () => {
    const response = await request(app)
      .get('/getAllUsers')
      .set('Authorization', `Bearer ${this.token}`)
    expect(response.body).to.be.an('array')
    response.body.map(user => expect(user).to.include.keys('pseudo','role'))
  })

  it('/POST create user', async () => {
    const response = await request(app)
      .post('/createUser')
      .set('Authorization', `Bearer ${this.token}`)
      .send([newUser])
    this.userId = response.body._id
    expect(response.body).to.deep.include(createdUser)
  })

  it('Fail create existing user', async () => {
    const response = await request(app)
      .post('/createUser')
      .set('Authorization', `Bearer ${this.token}`)
      .send([newUser])
    expect(response.status).to.eql(500)
    expect(response.text).to.eql('E11000 duplicate key error collection: convivio-api.users index: mail_1 dup key: { mail: "jvaljean@test.fr" }')
    expect(response.body).to.be.empty
  })

  it('/DELETE user', async () => {
    const del = await request(app)
      .delete(`/deleteUser/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
    const response = await request(app)
      .get('/getAllUsers')
      .set('Authorization', `Bearer ${this.token}`)
    expect(response.body).to.not.deep.include(newUser)
  })
})



