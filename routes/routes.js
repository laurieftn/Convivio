import express from 'express'
import { addRequest, getRequests, getRequest, deleteRequest } from '../controllers/requestControllers.js'
import { catchErrors } from './../helpers.js'

const router = express.Router()

// LaurieF ** Routes REQUESTS

router.post('/add-request', addRequest)

router.get('/requests', getRequests)

router.get('/request', getRequest)

router.get('/request/:id', catchErrors(getRequest))

router.delete('/request/:id', catchErrors(deleteRequest))

router.get('/requests', catchErrors(getRequests))

export default router



