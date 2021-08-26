import ServiceProviderModel from "../models/serviceProviderModel.js"

export const createServiceProvider = async function(req, res) {
    const provider = new ServiceProviderModel(req.body)
    await provider.save()
    res.status(200).send(provider)
}

export const deleteServiceProvider = async function(req, res) {
    const provider = await ServiceProviderModel.findByIdAndDelete(req.params.id)
    if (!provider) {
        res.status(404).send('Le fournisseur n\'est pas enregistré')
    }
    res.status(200).send()
}

export const updateServiceProvider = async function(req, res) {
    const provider = await ServiceProviderModel.findByIdAndUpdate(req.params.id, ...req.body)
    await provider.save()
    res.status(200).send()
}

export const getServiceProvider = async function(req, res) {
    const provider = await ServiceProviderModel.findById(req.params.id)
    res.send(provider)
}

export const getAllServiceProviders = async function(req, res) {
    const provider = await ServiceProviderModel.find()
    res.send(provider)
}

export const getAllServiceProvidersByType = async function(req, res) {
    const provider = await ServiceProviderModel.find({typeProvider: req.params.providerType})
    res.send(provider)
}
