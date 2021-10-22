import express from 'express'
import { createEvent, deleteEvent, updateEvent, getEvent, getAllEvents, getAllPublicEvents, getAllEventsFromCustomer, getAllEventsFromDate, getAllEventsFromCity, getAllEventsFromProvider }from '../controllers/eventControllers.js'
import { createEquipment, deleteEquipment, updateEquipment, getEquipment, getAllEquipments, getAllEquipmentsByType } from '../controllers/stockControllers.js'
import { createUser, updateUser, deleteUser, getUser, getAllUsers, login, ensureToken } from '../controllers/userControllers.js'
import { createServiceProvider, deleteServiceProvider, updateServiceProvider, getServiceProvider, getAllServiceProviders, getAllServiceProvidersByType } from '../controllers/serviceProvidersControllers.js'
import { catchErrors } from './../helpers.js'
import cors from 'cors'

const router = express.Router()
router.use(cors())
// LOGIN + PROTECTION des routes
router.post('/api/login', login)
router.get('/getAllPublicEvents', getAllPublicEvents) // Liste de tous les events publics
router.use(ensureToken); // Toutes les routes sous le ensureToken sont protégées

// ----------------------------------
// EVENTS --- Routes liées aux évènements
router.post('/createEvent', createEvent) // Créer un event
router.get('/getAllEvents', getAllEvents) // Liste de tous les events
router.get('/getAllEventsFromCustomer/:id', getAllEventsFromCustomer) // Liste de tous les events par client
router.get('/getAllEventsFromProvider/:id', getAllEventsFromProvider) // Liste de tous les events par prestataire
router.get('/getAllEventsFromDate', getAllEventsFromDate) // Liste de tous les events par date
router.get('/getAllEventsFromCity/:city', getAllEventsFromCity) // Liste de tous les events par ville
router.get('/getEvent/:id', getEvent) // Visualisation d'un event
router.patch('/updateEvent/:id', updateEvent) // Mise à jour d'un event
router.delete('/deleteEvent/:id', deleteEvent) // Suppression d'un event

// ----------------------------------
// USERS --- Routes liées aux utilisateurs de l'appcreate
router.post('/createUser', createUser)
router.get('/getUser/:id', getUser)
router.get('/getAllUsers', getAllUsers)
router.patch('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

// ----------------------------------
// STOCK --- Routes liées à la gestion des stocks des équipements
router.post('/createEquipment', createEquipment)
router.get('/getEquipment/:id', getEquipment)
router.get('/getAllEquipments', getAllEquipments)
router.get('/getAllEquipments/:type', getAllEquipmentsByType)
router.delete('/deleteEquipment/:id', deleteEquipment)
router.patch('/updateEquipment/:id', updateEquipment)

// ----------------------------------
// SERVICE PROVIDERS --- Routes liées aux prestataires
router.post('/createServiceProvider', createServiceProvider) // Créer un prestataire
router.get('/getAllServiceProviders', getAllServiceProviders) // Liste de tous les prestataires
router.get('/getAllServiceProviders/:type', getAllServiceProvidersByType) // Liste de tous les prestataires par type
router.get('/getServiceProvider/:id', getServiceProvider) // Visualisation d'un prestataire
router.patch('/updateServiceProvider/:id', updateServiceProvider) // Mise à jour d'un prestataire
router.delete('/deleteServiceProvider/:id', deleteServiceProvider) // Suppression d'un prestataire

export default router
