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
    "options": {
      "serviceProviders": [{
        "provider": "6127b02395609523d8bd9cc1",
        "comment": "ramène sa platine pour 299.99 €/ minute ht"
      }],
      "equipments": [{
        "equipment": "61279864a0718a0f307df3d8",
        "neededQuantity": 2,
        "priceRent": 200
      }]
    },
    "status": {
      "status": "started",
      "date": "2021-11-06T20:00:00.000Z",
      "current": true,
      "comment": "current is not required"
    },
    "comment": "ils sont chaud les marrons",
    "price": {
      "budget":14000000
    }
  }

  it('/GET get all public event', async () => {
    const response = await request(app)
      .get('/getAllPublicEvents')
    expect(response.body.map(e => e.eventDescription.public )).to.not.include(false)
  })

  it('/POST create event', async () => {
    const response = await request(app)
      .post('/createEvent')
      .set('Authorization', `Bearer ${this.token}`)
      .send([newEvent])
    this.eventId = response.body._id
    expect(response.body).to.deep.include(newEvent)
  })

  it('/PATCH update event with wrong id', async () => {
    newEvent.eventTitle = "soirée vertigo"
    const response = await request(app)
      .patch(`/updateEvent/6127b02395195d523d8d9cc1`)
      .set('Authorization', `Bearer ${this.token}`)
      .send({"eventTitle": "soirée vertigo"})
    expect(response.status).to.eql(400)
    expect(response.text).to.eql('L\'évènement n\'a pas été trouvé')
  })

  it('/PATCH update event with good id', async () => {
    newEvent.eventTitle = "soirée vertigo"
    const response = await request(app)
      .patch(`/updateEvent/${this.eventId}`)
      .set('Authorization', `Bearer ${this.token}`)
      .send({"eventTitle": "soirée vertigo"})
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