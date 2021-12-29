import app from '../index.js'
import request from 'supertest'
import chai from 'chai'
const expect = chai.expect


describe('Login', function () {
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
})



