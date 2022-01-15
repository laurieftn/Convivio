import app from '../index.js'
import request from 'supertest'
import faker from '@faker-js/faker'
import UserModel from '../models/userModel.js'
import StockModel from '../models/stockModel.js'
import ServiceProviderModel from '../models/serviceProviderModel.js'
faker.locale = 'fr'

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function builtUser (n) {
  return new Array(n)
    .fill(null)
    .map(() => ({
      "password": 'azerty',
      "role": ['staff','customer'][randomInt(0, 1)],
      "firstname": faker.name.firstName(),
      "lastname": faker.name.lastName(),
      "company": {
          "name": faker.company.companyName(),
          "address": faker.address.streetAddress(), //streetName()
          "city": faker.address.city(),
          "zipcode" : faker.address.zipCode()
      },
      "phone": faker.phone.phoneNumber(),
      "mail": faker.internet.email(),
      "deleted": false
  }))
}

function builtEquipment (n, arrayEquip) {
  return new Array(n)
    .fill(null)
    .map(() => ({
      equipment: arrayEquip[randomInt(0, arrayEquip.length-1)],
      neededQuantity: randomInt(1, 10),
      priceRent: randomInt(100, 600)
    }))
}

function builtSP (n, arraySP) {
  return new Array(n)
  .fill(null)
  .map(() => ({
    provider: arraySP[randomInt(0, arraySP.length-1)],
    comment: faker.lorem.sentence()
  }))
}

function builtEvent (n, obj) {
  return new Array(n)
  .fill(null)
  .map(() => ({
    "user": obj.users[randomInt(0, obj.users.length-1)], // test user id
    "eventTitle": faker.lorem.words(),
    "eventPicture":faker.image.imageUrl(),
    "eventDescription": {
      "description": faker.lorem.sentence(),
      "city": faker.address.city(),
      "zipcode": faker.address.zipCode(),
      "address": faker.address.streetAddress(),
      "eventType": faker.lorem.word(),
      "startDate": faker.date.between(new Date(2022,1,1,10,5), new Date(2022,7,31)),
      "endDate": faker.date.between(new Date(2022,1,1,10,5), new Date(2022,7,31)),
      "numberOfPeople": randomInt(10, 700),
      "public": [true, false][randomInt(0,1)]
    },
    "options": {
      "serviceProviders": builtSP(randomInt(0, 3), obj.sp ),
      "equipments": builtEquipment(randomInt(0, 4), obj.equip )
    },
    "status": {
      "status": ['started', 'description', 'concepting', 'dating', 'placing', 'servicing', 'scheduled', 'budgeting', 'validating', 'billing', 'archived' ][randomInt(0, 10)],
      "date": faker.date.between(new Date(2022,1,1,10,5), new Date(2022,7,31)),
      "current": true,
      "comment": faker.lorem.sentence()
    },
    "comment": faker.lorem.sentences(3),
    "price": {
      "budget": randomInt(1000,100000),
      "location": randomInt(200, 10000) ,
      "service": randomInt(400,15000)
    }
  }))
}

const run = async () => {
  const args = process.argv.slice(2)
  if (args.includes('-h')) {
    console.log(`usage seed [-u, --users, ..., --flush]
      add fake users or events to database
      options
        -u, --users n: seed n user(s)
        -e, --events n: seed n event(s)
    `)
    process.exit(0)
  }
  const users = args.includes('-u') || args.includes('--users')
  const events = args.includes('-e') || args.includes('--events')
  const count = args[1] || 1
  if (!users && !events) {
    console.log('nothing add to DB ')
    process.exit(0)
  }

  const response = await request(app).post('/api/login').send({
    "pseudo": process.env.TEST_USER,
    "password":process.env.TEST_PWD,
    "remember": false
  })
  const token = response.body.accessToken

  if (users) {
    const response = await request(app)
      .post('/createUser')
      .set('Authorization', `Bearer ${token}`)
      .send(builtUser(Number(count)))
    console.log('user(s) add to db :')
    // console.log(builtUser(Number(count)))
    console.log(response.body)
  }

  if (events) {
    const obj = {}
    // get list of equipments id, SP id and user id
    obj.users = await UserModel.find({ deleted: false },'_id').then(user => user.map( id => id._id))
    obj.equip = await StockModel.find({},'_id').then(e => e.map( id => id._id))
    obj.sp = await ServiceProviderModel.find({}, '_id').then(e => e.map( id => id._id))

    const response = await request(app)
      .post('/createEvent')
      .set('Authorization', `Bearer ${token}`)
      .send(builtEvent(Number(count), obj))
    console.log('event(s) add to db :')
    console.log(response.body)
    // console.log(builtEvent(Number(count), obj))
  }
  process.exit(0)
}

run()