import RequestModel from '../models/requestModel.js'

// Create
export const addRequest = async function(req, res) {
    const request = new RequestModel(req.body)
    await request.save() // sauvegarde dans la bdd
    res.send(request) // envoie la réponse
}

// Read All
export const getRequests = async function(req,res) {
    const requests = await RequestModel.find({})
    res.send(requests)
}

// Read One
export const getRequest = async function(req,res) {
    const request = await RequestModel.find({_id : req.params.id}) 
    res.send(request)
}

// Delete
export const deleteRequest = async function(req,res) {
    const request = await RequestModel.findByIdAndDelete(req.params.id)
    if (!request) {
        res.status(404).send('Aucune demande trouvée.')
    }
    res.status(200).send()
}

