import EventModel from '../models/eventModel.js'

// create
export const createEvent = async function(req, res) {
    req.body.map( async item =>  {
        const event = new EventModel(item)
        console.log('controller', event)
        await event.save().then((response) => { // sauvegarde dans la bdd
            res.status(200).send(response) // envoi la réponse
        }).catch(error => res.status(500).send(error.message))
    })
}

// Delete
export const deleteEvent = async function(req, res) {
    const event = await EventModel.findByIdAndDelete(req.params.id)
    if (!event) {
        res.status(404).send('Aucun évènement trouvé.')
    }
    res.status(200).send()
}

// Update
export const updateEvent = async function(req, res) {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, doc) => {
        if (!error) {
            return doc
        } else {
            return res.status(400).send(`La valeur de ${error.path} n'est pas correcte`)
        }
    })
    res.status(200).send(event)
}

// Read One
export const getEvent = async function(req, res) {
    const event = await EventModel.findById(req.params.id, (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(404).send('L\'évènement n\'a pas été trouvé')
        }
    })
    res.send(event)
}

//read All public event
export const getAllPublicEvents = async function(req, res) {
    const events = await EventModel.find({ 'eventDescription.public': true })
    .populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    .catch(error => res.status(500).send(error.message))
    if ( events.length < 1 ) {
        return res.status(404).send('Aucun évènement n\'a été trouvé')
    }
    res.send(events)
}
//read All
export const getAllEvents = async function(req, res) {
    const events = await EventModel.find({})
    .populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    .catch(error => res.status(500).send(error.message))
    if ( events.length < 1 ) {
        return res.status(404).send('Aucun évènement n\'a été trouvé')
    }
    res.send(events)
}

export const getAllEventsFromCustomer = async function(req, res) {
    const events = await EventModel.find({'user' : req.params.id})
    .populate('user',['firstname','lastname', 'company'])
    .populate('options.serviceProviders.provider')
    .catch(error => res.status(500).send(error.message))
    if ( events.length < 1 ) {
        return res.status(404).send('Aucun évènement n\'a été trouvé pour ce client')
    }
    res.send(events)
}

export const getAllEventsFromDate = async function(req, res) {
    const start = req.query.start.replace(' ', '+') // permet de transformer la date de manière à être comparable a mongo
    const end = req.query.end.replace(' ', '+')
    const events = await EventModel.find({
        "eventDescription.startDate" : {$gte : start},
        "eventDescription.endDate": {$lte : end}
    }).populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    .catch(error => res.status(500).send(error.message))
    if ( events.length < 1 ) {
        return res.status(404).send('Aucun évènement n\'a été trouvé pour ces dates')
    }
    res.send(events)
}

export const getAllEventsFromCity = async function(req, res) {
    const events = await EventModel.find({'eventDescription.city' : req.params.city})
    .populate('user',['firstname','lastname'])
    .populate('options.serviceProviders.provider')
    .catch(error => res.status(500).send(error.message))
    if ( events.length < 1 ) {
        return res.status(404).send('Aucun évènement n\'a été trouvé pour cette ville')
    }
    res.send(events)

}

export const getAllEventsFromProvider = async function(req, res) {
    const events = await EventModel.find({'options.serviceProviders.provider': req.params.id})
    .catch(error => res.status(500).send(error.message))
    if ( events.length < 1 ) {
        return res.status(404).send('Aucun évènement n\'a été trouvé pour ce prestataires')
    }
    res.send(events)
}
