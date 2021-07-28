import RoomModel from '../models/roomModel.js'

export const getTest = function(req, res) {
    res.send({
        name: "Création de l\'api - page TEST"
    })
}

export const postTest = function(req, res) {
    res.send(req.body)
}

export const addRoom = async function(req, res) {
    const room = new RoomModel(req.body)
    await room.save() // sauvegarde dans la bdd
    res.send(room) // envoi la réponse
}

// Read All
export const getRooms = async function(req,res) {
    const rooms = await RoomModel.find({})
    res.send(rooms)
}

// Read One
export const getRoom = async function(req,res) {
    const room = await RoomModel.find({_id : req.params.id}) 
    res.send(room)
}

// Update
export const updateRoom = async function(req,res) {
    const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body)
    await room.save()
    res.send(room)
}

// Delete
export const deleteRoom = async function(req,res) {
    const room = await RoomModel.findByIdAndDelete(req.params.id)
    if (!room) {
        res.status(404).send('Aucune chambre trouvée.')
    }
    res.status(200).send()
}