import express from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

const app = express();

export const createUser = async function(req, res) {
    req.body.map(async (item) =>{
        const user = new UserModel(item)
        await user.save() // sauvegarde dans la bdd
        res.status(200).send(user) // envoi la réponse
    })
}

export const updateUser = async function(req, res) {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    await user.save()
    res.status(200).send(user) // envoi la réponse
}

export const deleteUser = async function(req, res) {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
        res.status(404).send('Aucun évènement trouvé.')
    } 
    res.status(200).send() // envoi la réponse
}

export const getUser = async function(req, res) {
    const user = await UserModel.findById(req.params.id) // si ça ne fonctionne pas ajouter un .exec()
    res.send(user)
}

export const getAllUsers = async function(req, res) {
    const user = await UserModel.find()
    res.send(user)
}


// ** Création du token d'authentification avec jwt
export async function login(req, res) { // Route d'authentification
    const user = await UserModel.login(req.body.pseudo, req.body.password); // Login de l'utilisateur avec pseudo et mot de passe
    if (user) {
        const token = jwt.sign({user}, 'my_secret_key', { expiresIn: '1h' }); // Génération du token avec une durée de vie d'1h
        res.json({
            token, user
        });
    } else {
        res.status(404).send('Utilisateur inexistant.')
    }
};

export function ensureToken(req, res, next) { // Fonction qui sert à vérifier que l'user qui suit cette route a créé un token avant
    if (req.headers['authorization'] !== undefined){
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        if (bearerToken !== 'undefined') {
    // Bearer = prefixe token
            jwt.verify(bearerToken, 'my_secret_key', (err) => {
                if (err) {
                    res.status(401).send(err.message); // Si erreur, va envoyer un statut erreur ou que son token n'existe pas
                } else {
                    req.token = bearerToken; // Conserve le token dans l'objet de la demande
                    next();
                }
            })
        }
    } else {
        res.sendStatus(401).send(err.message);
    }
}