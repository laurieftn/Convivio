import StockModel from "../models/stockModel.js"

export const createEquipment = async function(req, res) {
    const equipment = new StockModel(...res.body)
    await equipment.save()
    res.status(200).send(equipment)
}

export const deleteEquipment = async function(req, res) {
    const equipment = await StockModel.findByIdAndDelete(req.params.id)
    if (!equipment) {
        res.status(404).send('Aucun équipement trouvé')
    }
    res.status(200).send()
}

export const updateEquipment = async function(req, res) {
    const equipment = await StockModel.findByIdAndUpdate(req.params.id, req.body)
    await equipment.save()
    res.status(200).send(equipment)
}

export const getEquipment = async function(req, res) {
    const equipment = await StockModel.findById(req.params.id)
    res.send(equipment)
}

export const getAllEquipments = async function(req, res) {
    const equipment = await StockModel.find()
    res.send(equipment)
}

export const getAllEquipmentsByType = async function(req, res) {
    const equipment = await StockModel.find({equipmentType: req.params.equipmentType})
    res.send(equipment)
}

