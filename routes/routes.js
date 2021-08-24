import express from 'express'
import {addEvent , getEvents , getOneEvent , updateEvent ,deleteEvent}from '../controllers/eventControllers.js'
import { addRequest, getRequests, getRequest, deleteRequest } from '../controllers/requestControllers.js'
import { addAgency, getAgency, updateAgency, deleteAgency, auth, protectedLaurie, ensureToken } from '../controllers/agencyControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()
const app = express()

// ----------------------------------

// Routes liées aux évènements
router.post('/event', catchErrors(addEvent)) // Créer un event 
router.get('/listOfEvents', catchErrors(getEvents)) // Liste de tous les events 
router.get('/event/:id', catchErrors(getOneEvent)) // Visualisation d'un event 
router.patch('/event/:id', catchErrors(updateEvent)) // Mise à jour d'un event 
router.delete('/event/:id', catchErrors(deleteEvent)) // Suppression d'un event 

// ----------------------------------

// Routes liées aux utilisateurs de l'agence
router.post('/agency', catchErrors(addAgency))
router.get('/agency/:id', catchErrors(getAgency))
router.patch('/agency/:id', catchErrors(updateAgency))
router.delete('/agency/:id', catchErrors(deleteAgency))

// ----------------------------------
// Login routes
router.post('/api/login', (auth))
router.use(ensureToken); // Toutes les routes sous le ensureToken sont protégées
router.get('/api/protected', (protectedLaurie))

// ----------------------------------

// Routes liées aux demandes clients concernant la préparation d'évènements
router.post('/addRequest', addRequest)
router.get('/requests', getRequests)
router.get('/request', getRequest)
router.get('/request/:id', catchErrors(getRequest))
router.delete('/request/:id', catchErrors(deleteRequest))
router.get('/requests', catchErrors(getRequests))
// ----------------------------------

export default router



