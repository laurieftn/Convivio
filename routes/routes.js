import express from 'express'
import { createEvent, deleteEvent, updateEvent, getEvent, getAllEvents, getAllEventsFromCustomer, getAllEventsFromDate, getAllEventsFromCity, getAllEventsFromProvider }from '../controllers/eventControllers.js'
import { createEquipment, deleteEquipment, updateEquipment, getEquipment, getAllEquipments, getAllEquipmentsByType } from '../controllers/stockControllers.js'
import { createUser, updateUser, deleteUser, getUser, getAllUsers, login } from '../controllers/userControllers.js'
import { createServiceProvider, deleteServiceProvider, updateServiceProvider, getServiceProvider, getAllServiceProviders, getAllServiceProvidersByType } from '../controllers/serviceProvidersControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()

// ----------------------------------
// EVENTS --- Routes liées aux évènements
router.post('/createEvent', catchErrors(createEvent)) // Créer un event 
router.get('/getAllEvents', catchErrors(getAllEvents)) // Liste de tous les events 
router.get('/getAllEventsFromCustomer/:id', catchErrors(getAllEventsFromCustomer)) // Liste de tous les events par client
router.get('/getAllEventsFromProvider/:id', catchErrors(getAllEventsFromProvider)) // Liste de tous les events par prestataire
router.get('/getAllEventsByDate', catchErrors(getAllEventsFromDate)) // Liste de tous les events par date
router.get('/getAllEventsFromCity/:city', catchErrors(getAllEventsFromCity)) // Liste de tous les events par ville
router.get('/getEvent/:id', catchErrors(getEvent)) // Visualisation d'un event 
router.patch('/updateEvent/:id', catchErrors(updateEvent)) // Mise à jour d'un event 
router.delete('/deleteEvent/:id', catchErrors(deleteEvent)) // Suppression d'un event 

// ----------------------------------
// USERS --- Routes liées aux utilisateurs de l'appcreate
router.post('/createUser', catchErrors(createUser))
router.get('/getUser/:id', catchErrors(getUser))
router.get('/getAllUsers', catchErrors(getAllUsers))
router.patch('/updateUser/:id', catchErrors(updateUser))
router.delete('/deleteUser/:id', catchErrors(deleteUser))

// ----------------------------------
// LOGIN + PROTECTION des routes
router.post('/api/login', (login))
// router.use(ensureToken); // Toutes les routes sous le ensureToken sont protégées
// router.get('/api/protected', (protected))

// ----------------------------------
// STOCK --- Routes liées à la gestion des stocks des équipements
router.post('/createEquipment', createEquipment)
router.get('/getEquipment/:id', getEquipment)
router.get('/getAllEquipments', getAllEquipments)
router.get('/getAllEquipments/type', catchErrors(getAllEquipmentsByType))
router.delete('/deleteEquipment/:id', catchErrors(deleteEquipment))
router.patch('/updateEquipment', catchErrors(updateEquipment))

// ----------------------------------
// SERVICE PROVIDERS --- Routes liées aux prestataires
router.post('/createServiceProvider', catchErrors(createServiceProvider)) // Créer un prestataire
router.get('/getAllServiceProviders', catchErrors(getAllServiceProviders)) // Liste de tous les prestataires
router.get('/getAllServiceProviders/:type', catchErrors(getAllServiceProvidersByType)) // Liste de tous les prestataires par type
router.get('/getServiceProvider/:id', catchErrors(getServiceProvider)) // Visualisation d'un prestataire
router.patch('/updateServiceProvider/:id', catchErrors(updateServiceProvider)) // Mise à jour d'un prestataire
router.delete('/deleteServiceProvider/:id', catchErrors(deleteServiceProvider)) // Suppression d'un prestataire

export default router