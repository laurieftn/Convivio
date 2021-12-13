import StockModel from "../models/stockModel.js"

export const createEquipment = async function(req, res) {
        req.body.map(async (item) =>{
            const equipment = new StockModel(item)
            await equipment.save().then((response) => {
            res.status(200).send(response)
        }).catch(error => res.status(500).send(error.message))
        })
}

export const deleteEquipment = async function(req, res) {
    const equipment = await StockModel.findByIdAndDelete(req.params.id)
    if (!equipment) {
       return res.status(404).send('Aucun équipement trouvé')
    }
    res.status(200).send()
}

export const updateEquipment = async function(req, res) {
    const equipment = await StockModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(400).send(`La valeur de ${error.path} n'est pas correcte`)
        }
    })
    res.status(200).send(equipment)
}

export const getEquipment = async function(req, res) {
    const equipment = await StockModel.findById(req.params.id,  (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(404).send('L\'équipement n\'a pas été trouvé')
        }
    })
    res.status(200).send(equipment)
}

export const getAllEquipments = async function(req, res) {
    const equipment = await StockModel.find()
    if ( equipment.length < 1 ) {
        return res.status(404).send('Aucun équipement n\'a été trouvé')
    }
    res.status(200).send(equipment)
}

export const getAllEquipmentsByType = async function(req, res) {
    const equipment = await StockModel.find({equipmentType: req.params.type})
    if ( equipment.length < 1 ) {
        return res.status(404).send('Aucun équipement n\'a été trouvé')
    }
    res.status(200).send(equipment)
}