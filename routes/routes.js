import express from 'express'
//Partie Adrien
import {  addAgency, getAgency, updateAgency, deleteAgency } from '../controllers/agencyControllers.js'
//Fin Partie Adrien
import { catchErrors } from './../helpers.js'

const router = express.Router()

router.get('/', function(req, res) {
    res.send('Hello')
})

//Partie Adrien

router.post('/agency', catchErrors(addAgency))

router.get('/agency/:id', catchErrors(getAgency))

router.patch('/agency/:id', catchErrors(updateAgency))

router.delete('/agency/:id', catchErrors(deleteAgency))
 
//Fin Partie Adrien


export default router



