import UserModel from '../models/userModel.js'

export const createUser = async function(req, res) {
    const user = new UserModel(...req.body)
    await user.save() // sauvegarde dans la bdd
    res.status(200).send(user) // envoi la réponse
}

export const updateUser = async function(req, res) {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body)
    await user.save()
    res.status(200).send(user) // envoi la réponse
}

export const DeleteUser = async function(req, res) {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
        res.status(404).send('Aucun évènement trouvé.')
    } 
    res.status(200).send() // envoi la réponse
}

export const ReadUser = async function(req, res) {
    const user = await UserModel.findById(req.params.id) // si ça ne fonctionne pas ajouter un .exec()
    res.send(user)
}

export const ReadAllUsers = async function(req, res) {
    const user = await UserModel.find()
    res.send(user)
}

