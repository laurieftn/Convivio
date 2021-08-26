import express from 'express'
import { createEvent , deleteEvent , updateEvent , getEvent ,getAllEvents, getAllEventsFromCustomers, getAllEventsFromDate }from '../controllers/eventControllers.js'
import { createEquipment, deleteEquipment, updateEquipment, getEquipment, getAllEquipments, getAllEquipmentsByType } from '../controllers/stockControllers.js'
<<<<<<< HEAD
import { createUser, updateUser, deleteUser, getUser, getAllUsers, login, protectedLaurie, ensureToken } from '../controllers/userControllers.js'
=======
import { createUser, updateUser, deleteUser, getUser, getAllUsers, login, ensureToken } from '../controllers/userControllers.js'
>>>>>>> 24522ed2539e0fe310f8fa3dfdbb4cf9284035e6
import { createServiceProvider, deleteServiceProvider, updateServiceProvider, getServiceProvider, getAllServiceProviders, getAllServiceProvidersByType } from '../controllers/serviceProvidersControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()

// ----------------------------------
// EVENTS --- Routes liées aux évènements
router.post('/createEvent', catchErrors(createEvent)) // Créer un event 
router.get('/getAllEvents', catchErrors(getAllEvents)) // Liste de tous les events 
router.get('/getAllEvents/:id', catchErrors(getAllEventsFromCustomers)) // Liste de tous les events par client
router.get('/getAllEvents/:date', catchErrors(getAllEventsFromDate)) // Liste de tous les events par date
router.get('/getEvent/:id', catchErrors(getEvent)) // Visualisation d'un event 
router.patch('/updateEvent/:id', catchErrors(updateEvent)) // Mise à jour d'un event 
router.delete('/deleteEvent/:id', catchErrors(deleteEvent)) // Suppression d'un event 

// ----------------------------------
// USERS --- Routes liées aux utilisateurs de l'app
router.post('/createUser', catchErrors(createUser))
router.get('/getUser/:id', catchErrors(getUser))
router.get('/getAllUsers', catchErrors(getAllUsers))
router.patch('/updateUser/:id', catchErrors(updateUser))
router.delete('/deleteUser/:id', catchErrors(deleteUser))

// ----------------------------------
// LOGIN + PROTECTION des routes
router.post('/api/login', (login))
<<<<<<< HEAD
router.use(ensureToken); // Toutes les routes sous le ensureToken sont protégées
router.get('/api/protected', (protectedLaurie))
=======
// router.use(ensureToken); // Toutes les routes sous le ensureToken sont protégées
// router.get('/api/protected', (protected))
>>>>>>> 24522ed2539e0fe310f8fa3dfdbb4cf9284035e6

// ----------------------------------
// STOCK --- Routes liées à la gestion des stocks des équipements
router.post('/createEquipment', createEquipment)
router.get('/getEquipment', getEquipment)
router.get('/getAllEquipments', getAllEquipments)
router.get('/getAllEquipments/:id', catchErrors(getAllEquipmentsByType))
router.delete('/deleteEquipment/:id', catchErrors(deleteEquipment))
router.patch('/updateEquipment', catchErrors(updateEquipment))

// ----------------------------------
// SERVICE PROVIDERS --- Routes liées aux prestataires
router.post('/createServiceProvider', catchErrors(createServiceProvider)) // Créer un prestataire
router.get('/getAllServiceProviders', catchErrors(getAllServiceProviders)) // Liste de tous les prestataires
router.get('/getAllServiceProviders/:id', catchErrors(getAllServiceProvidersByType)) // Liste de tous les prestataires par type
router.get('/getServiceProvider/:id', catchErrors(getServiceProvider)) // Visualisation d'un prestataire
router.patch('/updateServiceProvider/:id', catchErrors(updateServiceProvider)) // Mise à jour d'un prestataire
router.delete('/deleteServiceProvider/:id', catchErrors(deleteServiceProvider)) // Suppression d'un prestataire

export default router