import app from '../index.js'
import request from 'supertest'
import chai from 'chai'
const expect = chai.expect

describe('Event Controller', function() {
  before( async () => {
    const response = await request(app).post('/api/login').send({
      "pseudo": process.env.TEST_USER,
      "password":process.env.TEST_PWD,
      "remember": false
    })
    this.token = response.body.accessToken
  })

  const newEvent = {
    "user": "61cc0c82d156960016677a85", // test user id
    "eventTitle": "soirée vernissage",
    "eventDescription": {
      "description": "vernissage des toiles de mme de la rivière",
      "city": "amiens",
      "zipcode": "80000",
      "address": "70 rue des jacobins",
      "eventType": "vernissage",
      "startDate": "2021-12-06T20:00:00.000Z",
      "endDate": "2021-12-12T23:59:59.000Z",
      "numberOfPeople": 500,
      "public": false
    },
    "option": {
      "ServiceProvider": [{
        "provider": "6127b02395609523d8bd9cc1",
        "comment": "Ramène sa platine pour 299.99 €/ minute HT"
      }],
      "equipment": [{
        "type": "micro",
        "neededQuantity": 2,
        "priceRent": 200
      }]
    },
    "comment": "Ils sont chaud les marrons",
    "totalPrice": 14000000
  }

  it.only('/POST create event', async () => {
    const response = await request(app)
      .post('/createEvent')
      .set('Authorization', `Bearer ${this.token}`)
      .send([newEvent])
    this.eventId = response.body._id
    console.log(response.body)
    expect(response.body).to.deep.include(newEvent)
  })

  it('/DELETE user', async () => {
    const del = await request(app)
      .delete(`/deleteEvent/${this.eventId}`)
      .set('Authorization', `Bearer ${this.token}`)
    const response = await request(app)
      .get('/getAllUsers')
      .set('Authorization', `Bearer ${this.token}`)
    expect(response.body).to.not.deep.include(newEvent)
  })

})