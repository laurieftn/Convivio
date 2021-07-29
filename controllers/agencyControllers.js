import AgencyModel from '../models/agencyModel.js'


export const addAgency = async function(req, res) {
    const agency = new AgencyModel(req.body)
    await agency.save() // sauvegarde dans la bdd
    res.send(agency) // envoi la réponse
}

// Read One
export const getAgency = async function(req,res) {
    const agency = await AgencyModel.find({_id : req.params.id}) 
    res.send(agency)
}

// Update
export const updateAgency = async function(req,res) {
    const agency = await AgencyModel.findByIdAndUpdate(req.params.id, req.body)
    await agency.save()
    res.send(agency)
}

// Delete
export const deleteAgency = async function(req,res) {
    const agency = await AgencyModel.findByIdAndDelete(req.params.id)
    if (!agency) {
        res.status(404).send('Aucun fichier trouvé.')
    }
    res.status(200).send()
}