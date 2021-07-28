import express from 'express'
import { getTest, postTest, addRoom, getRooms, getRoom, updateRoom, deleteRoom } from '../controllers/roomControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()

router.get('/', function(req, res) {
    res.send('Hello')
})

router.get('/test', getTest)

router.post('/test', postTest)

router.post('/room', catchErrors(addRoom))

router.get('/room/:id', catchErrors(getRoom))

router.patch('/room/:id', catchErrors(updateRoom))

router.delete('/room/:id', catchErrors(deleteRoom))

router.get('/rooms', catchErrors(getRooms))

export default router



