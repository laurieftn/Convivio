import AgencyModel from '../models/agencyModel.js'


export const addAgency = async function(req, res) {
    const agency = new AgencyModel(req.body)
    await agency.save() // sauvegarde dans la bdd
    res.send(room) // envoi la réponse
}

// Read One
export const getAgency = async function(req,res) {
    const room = await AgencyModel.find({_id : req.params.id}) 
    res.send(room)
}

// Update
export const updateAgency = async function(req,res) {
    const room = await AgencyModel.findByIdAndUpdate(req.params.id, req.body)
    await room.save()
    res.send(room)
}

// Delete
export const deleteAgency = async function(req,res) {
    const room = await AgencyModel.findByIdAndDelete(req.params.id)
    if (!room) {
        res.status(404).send('Aucun fichier trouvé.')
    }
    res.status(200).send()
}