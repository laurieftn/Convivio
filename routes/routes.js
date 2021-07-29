import express from 'express'
//Partie Lucas
import {addEvent , getEvents , getOneEvent , updateEvent ,deleteEvent}from '../controllers/eventControllers.js'
//Partie Laurie
import { addRequest, getRequests, getRequest, deleteRequest } from '../controllers/requestControllers.js'
//Partie Adrien
import {  addAgency, getAgency, updateAgency, deleteAgency } from '../controllers/agencyControllers.js'
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

// creer une requete
router.post('/add-request', addRequest)

router.get('/requests', getRequests)

router.get('/request', getRequest)

router.get('/request/:id', catchErrors(getRequest))

router.delete('/request/:id', catchErrors(deleteRequest))

router.get('/requests', catchErrors(getRequests))

// ----------------------------------

//Partie Adrien

router.post('/agency', catchErrors(addAgency))

router.get('/agency/:id', catchErrors(getAgency))

router.patch('/agency/:id', catchErrors(updateAgency))

router.delete('/agency/:id', catchErrors(deleteAgency))
 
//Fin Partie Adrien


export default router



