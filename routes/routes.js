import express from 'express'
import { createEvent , deleteEvent , updateEvent , getEvent ,getAllEvents, getAllEventsFromCustomers, getAllEventsFromDate}from '../controllers/eventControllers.js'
import { createEquipment, deleteEquipment, updateEquipment, getEquipment, getAllEquipments, getAllEquipmentsByType } from '../controllers/stockControllers.js'
import { createUser, updateUser, deleteUser, getUser, getAllUsers, login, protected, ensureToken } from '../controllers/userControllers.js'
import { createServiceProvider, deleteServiceProvider, updateServiceProvider, getServiceProvider, getAllServiceProviders, getAllServiceProvidersByType } from '../controllers/serviceProvidersControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()
const app = express()

// ----------------------------------

// EVENTS --- Routes liées aux évènements
router.post('/event', catchErrors(createEvent)) // Créer un event 
router.get('/listOfEvents', catchErrors(getAllEvents)) // Liste de tous les events 
router.get('/listOfEvents/:id', catchErrors(getAllEventsFromCustomers)) // Liste de tous les events par client
router.get('/listOfEvents/:date', catchErrors(getAllEventsFromDate)) // Liste de tous les events par date
router.get('/event/:id', catchErrors(getEvent)) // Visualisation d'un event 
router.patch('/event/:id', catchErrors(updateEvent)) // Mise à jour d'un event 
router.delete('/event/:id', catchErrors(deleteEvent)) // Suppression d'un event 

// ----------------------------------
// USERS --- Routes liées aux utilisateurs de l'app
router.post('/user', catchErrors(createUser))
router.get('/user/:id', catchErrors(getUser))
router.get('/listOfUsers', catchErrors(getAllUsers))
router.patch('/user/:id', catchErrors(updateUser))
router.delete('/user/:id', catchErrors(deleteUser))

// ----------------------------------
// LOGIN + PROTECTION des routes
router.post('/api/login', (login))
router.use(ensureToken); // Toutes les routes sous le ensureToken sont protégées
router.get('/api/protected', (protected))

// ----------------------------------
// STOCK --- Routes liées à la gestion des stocks des équipements
router.post('/equipment', createEquipment)
router.get('/equipment', getEquipment)
router.get('/listOfEquipments', getAllEquipments)
router.get('/equipment/:id', catchErrors(getAllEquipmentsByType))
router.delete('/equipment/:id', catchErrors(deleteEquipment))
router.patch('/equipment', catchErrors(updateEquipment))
// ----------------------------------

export default router



