import EventModel from '../models/eventModel.js'

// create 
export const addEvent = async function(req, res) {
    const event = new EventModel(req.body)
    await event.save() // sauvegarde dans la bdd
    res.send(event) // envoi la réponse
}

//read All
export const getEvents = async function(req,res) {
    const events = await EventModel.find({})
    res.send(events)
}

// Read One
export const getOneEvent = async function(req,res) {
    const event = await EventModel.find({_id : req.params.id}) 
    res.send(event)
}

// Update
export const updateEvent = async function(req,res) {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body)
    await event.save()
    res.send(event)
}

// Delete
export const deleteEvent = async function(req,res) {
    const event = await EventModel.findByIdAndDelete(req.params.id)
    if (!event) {
        res.status(404).send('Aucun évènement trouvé.')
    }
    res.status(200).send()
}