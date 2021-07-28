import express from 'express'
import {addEvent , getEvents , getOneEvent , updateEvent ,deleteEvent}from '../controllers/roomControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()

router.get('/', function(req, res) {
    res.send('Hello')
})

// partie Event Lucas

// creer un event 
router.post('/event', catchErrors(addEvent))

// liste de tous les events 
router.get('/listOfEvents', catchErrors(getEvents))

// visualisation d'un event 
router.get('/event/:id', catchErrors(getOneEvent))

// mise a jour d'un event 
router.patch('/event/:id', catchErrors(updateEvent))

// supression d'un event 
router.delete('/event/:id', catchErrors(deleteEvent))

// --------------------------------------

export default router



