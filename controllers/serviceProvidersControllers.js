import ServiceProviderModel from "../models/serviceProviderModel.js"

export const createServiceProvider = async function(req, res) {
    req.body.map(async (item) =>{
        const provider = new ServiceProviderModel(item)
        await provider.save()
        .then((response) => {
            res.status(200).send(response)
        }).catch(error => res.status(500).send(error.message))
    })
}

export const deleteServiceProvider = async function(req, res) {
    const provider = await ServiceProviderModel.findByIdAndDelete(req.params.id)
    if (!provider) {
        res.status(404).send('Le fournisseur n\'est pas enregistré')
    }
    res.status(200).send(provider)
}

export const updateServiceProvider = async function(req, res) {
    const provider = await ServiceProviderModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(400).send(`La valeur de ${error.path} n'est pas correcte`)
        }
    })
    res.status(200).send(provider)
}

export const getServiceProvider = async function(req, res) {
    const provider = await ServiceProviderModel.findById(req.params.id, (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(404).send('Le prestataire n\'a pas été trouvé')
        }
    })
    res.status(200).send(provider)
}

export const getAllServiceProviders = async function(req, res) {
    const provider = await ServiceProviderModel.find()
    if ( provider.length < 1 ) {
        return res.status(404).send('Aucun prestatataire n\'a été trouvé')
    }
    res.status(200).send(provider)
}

export const getAllServiceProvidersByType = async function(req, res) {
    const provider = await ServiceProviderModel.find({type: req.params.type})
    if ( provider.length < 1 ) {
        return res.status(404).send('Aucun prestatataire n\'a été trouvé')
    }
    res.status(200).send(provider)
}
