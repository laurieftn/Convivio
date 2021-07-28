import express from 'express'
import {addEvent , getEvents , getOneEvent , updateEvent ,deleteEvent}from '../controllers/roomControllers.js'
import { addRequest, getRequests, getRequest, deleteRequest } from '../controllers/requestControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()

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
// LaurieF ** Routes REQUESTS
router.add('/add-request', addRequest)

router.get('/requests', getRequests)

router.get('/request', getRequest)

router.get('/request/:id', catchErrors(getRequest))

router.delete('/request/:id', catchErrors(deleteRequest))

router.get('/requests', catchErrors(getRequests))

// ----------------------------------


export default router



