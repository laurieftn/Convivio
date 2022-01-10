import app from '../index.js'
import request from 'supertest'
import chai from 'chai'
import { format } from 'date-fns'
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
      "password": process.env.TEST_PWD,
      "remember": false
    })
    expect(response.status).to.eql(200)
    expect(response.body).to.include.keys('accessToken', 'user')
    expect(response.body.user.pseudo).to.eql(process.env.TEST_USER)
  })
})

describe('User Controllers', function () {
  const newEvent = {
    "user": null, // test user id
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

  const createEvent = async (data, userId, token) => {
    data.user = userId
    return await request(app)
      .post('/createEvent')
      .set('Authorization', `Bearer ${token}`)
      .send([data])
  }

  const deleteEvent = async (eventId, token) => {
    const del = await request(app)
    .delete(`/deleteEvent/${eventId}`)
    .set('Authorization', `Bearer ${token}`)
  }

  const createdUser = {
    "pseudo": "jvaljean",
    "role": "customer",
    "firstname": "jean",
    "lastname": "valjean",
    "company": {
        "name": "les misérables"
    },
    "phone": "06-00-00-00-00",
    "mail": "jvaljean@test.fr",
    "deleted": false
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
    "password": "misère",
    "deleted": false
  }

  before( async () => {
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

  it('/DELETE soft delete user', async () => {
    // creation of event with test user
    const event = await createEvent(newEvent, this.userId, this.token)
    this.eventId = event.body._id
    createdUser.deleted = true
    const del = await request(app)
      .delete(`/softDeleteUser/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
    expect(del.body).to.eql({_id: this.userId})
    const deletedUser = await request(app)
      .get(`/getUser/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
    expect(deletedUser.body).to.include({ deleted:true })
    const response = await request(app)
      .get('/getAllUsers')
      .set('Authorization', `Bearer ${this.token}`)
    response.body.map(user => expect(user).to.not.include({ pseudo: createdUser.pseudo, mail: createdUser.mail}))
  })

  it('check if event comment is well modified after soft delete', async () => {
    newEvent.comment = `utilisateur archivé le ${format(Date.now(),'dd/MM/yyyy')} ` + newEvent.comment
    const events = await request(app)
      .get(`/getAllEventsFromCustomer/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
    events.body.map(event => expect(event.comment).to.eql(newEvent.comment))
  })

  it('/POST login soft deleted user', async () => {
    const response = await request(app).post('/api/login').send({
      "pseudo": newUser.pseudo,
      "password":newUser.password,
      "remember": false
    })
    expect(response.status).to.eql(403)
    expect(response.text).to.eql('Utilisateur archivé')
  })

  it('/PATCH restore user', async () => {
    createdUser.deleted = false
    it('restore', async () => {
      const restore = await request(app)
        .patch(`/restoreUser/${this.userId}`)
        .set('Authorization', `Bearer ${this.token}`)
      expect(restore.body).to.deep.include(createdUser)
    })
    it('check if deleted === false', async () => {
      const restoreUser = await request(app)
      .get(`/getUser/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
      expect(restoreUser.body).to.include({ deleted:false })
    })

    it('check if event comment is well modified after restore', async () => {
      const events = await request(app)
      .get(`/getAllEventsFromCustomer/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
      events.body.map(event => expect(event.comment).to.eql(`utilisateur restauré le ${format(Date.now(),'dd/MM/yyyy')} ` + newEvent.comment))
    })
  })


  it('/DELETE real delete user', async () => {
    const del = await request(app)
      .delete(`/deleteUser/${this.userId}`)
      .set('Authorization', `Bearer ${this.token}`)
    const response = await request(app)
      .get('/getAllUsers')
      .set('Authorization', `Bearer ${this.token}`)
    response.body.map(user => expect(user).to.not.include({ pseudo: createdUser.pseudo, mail: createdUser.mail}))
  })

  after(async () => {
    deleteEvent(this.eventId, this.token)
  })
})
