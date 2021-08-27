import EventModel from '../models/eventModel.js'
import { formatISO } from 'date-fns'

// create 
export const createEvent = async function(req, res) {
    req.body.map( async item =>  {
        const event = new EventModel(item)
        await event.save() // sauvegarde dans la bdd
        res.status(200).send(event) // envoi la réponse
    })
}

// Delete
export const deleteEvent = async function(req,res) {
    const event = await EventModel.findByIdAndDelete(req.params.id)
    if (!event) {
        res.status(404).send('Aucun évènement trouvé.')
    }
    res.status(200).send()
}

// Update
export const updateEvent = async function(req,res) {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body)
    await event.save()
    res.status(200).send(event)
}

// Read One
export const getEvent = async function(req,res) {
    const event = await EventModel.findById(req.params.id) 
    res.send(event)
}

//read All
export const getAllEvents = async function(req,res) {
    const events = await EventModel.find({})
    .populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    res.send(events)
}

export const getAllEventsFromCustomer = async function(req,res) {
    const event = await EventModel.find({'user' : req.params.id}) // à vérfier
    res.send(event)
}

export const getAllEventsFromDate = async function(req,res) {
    const start = req.query.start.replace(' ', '+') // permet de transformer la date de manière à être comparable a mongo
    const end = req.query.end.replace(' ', '+')
    const event = await EventModel.find(
        {"eventDescription.startDate" : {$gte : start},
        "eventDescription.endDate": {$lte : end}}) // à vérfier
    .populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    res.send(event)
}

export const getAllEventsFromCity = async function(req,res) {
    const event = await EventModel.find({'eventDescription.city' : req.params.city}) // à vérfier
    .populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    res.send(event)
}

export const getAllEventsFromProvider = async function(req,res) {
    const event = await EventModel.find({'options.serviceProviders.provider': req.params.id}) // à vérfier
    res.send(event)
}
