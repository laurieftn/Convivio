import express from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
import EventModel from '../models/eventModel.js'
import { format } from 'date-fns'

const app = express();

export const createUser = async function(req, res) {
    req.body.map(async (item) =>{
        item.pseudo = item.firstname.substr(0, 1) + item.lastname
        item.password = await UserModel.hashing(item.password)
        const user = new UserModel(Object.assign(item, {deleted: false}))
        await user.save().then((response) => {
            return res.status(200).send(response)
        }).catch(error => res.status(500).send(error.message))
    })
}

export const updateUser = async function(req, res) {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, doc) => {
        if (!error) {
            return doc
        } else {
            return res.status(400).send(`La valeur de ${error.path} n'est pas correcte`)
        }
    })
    res.status(200).send(user) // envoi la réponse
}

// soft delete
export const softDeleteUser = async function(req, res) {
    const user = await UserModel.findByIdAndUpdate(req.params.id, {deleted: true}, { new: true }, async (error, doc) => {
        if (error) {
            return res.status(404).send('Aucun utilisateur trouvé.')
        }
        // handling of event for this user
        // get concerned events
        const events = await EventModel.find({ 'user' : doc._id }, 'comment')
        // update each event to add commment
        events.map(async event => {
            await EventModel.findByIdAndUpdate(event._id, { $set: { comment: `Utilisateur archivé le ${format(Date.now(),'dd/MM/yyyy')} ` + event.comment }})
        })
    })
    res.status(200).send(user) // envoi la réponse
}

export const restoreUser = async function(req, res) {
    const user = await UserModel.findByIdAndUpdate(req.params.id, {deleted: false}, {new: true}, async (error, doc) => {
        if (error) {
            return res.status(404).send('Aucun utilisateur trouvé.')
        }
        const events = await EventModel.find({ 'user' : doc._id }, 'comment')
        // update each event to add commment
        events.map(async event => {
            await EventModel.findByIdAndUpdate(event._id, { $set: { comment: `Utilisateur restauré le ${format(Date.now(),'dd/MM/yyyy')} ` + event.comment }})
        })
    })
    res.status(200).send(user) // envoi la réponse
}

// real delete
export const deleteUser = async function(req, res) {
    const user = await UserModel.findByIdAndDelete(req.params.id)
        if (!user) {
        return res.status(404).send('Aucun utilisateur trouvé.')
        }
    res.status(200).send() // envoi la réponse
}

export const getUser = async function(req, res) {
    const user = await UserModel.findById(req.params.id, (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(401).send('L\'utilisateur n\'a pas été trouvé')
        }
    })
    res.status(200).send(user)
}

export const getArchivedUsers = async function(req, res) {
    const users = await UserModel.find({ deleted: true })
    if ( users.length < 1 ) {
        return res.status(404).send('Aucun utilisateur n\'a été trouvé')
    }
    res.status(200).send(users)
}

export const getUsersByRole = async function(req, res) {
    const users = await UserModel.find({ deleted: false, role: req.params.role }, '_id firstname lastname company.name')
    if ( users.length < 1 ) {
        return res.status(404).send('Aucun utilisateur n\'a été trouvé')
    }
    res.status(200).send(users)
}

export const getAllUsers = async function(req, res) {
    const users = await UserModel.find({ deleted: false })
    if ( users.length < 1 ) {
        return res.status(404).send('Aucun utilisateur n\'a été trouvé')
    }
    res.status(200).send(users)
}


// ** Création du token d'authentification avec jwt
export async function login(req, res) { // Route d'authentification
    const user = await UserModel.findOne({pseudo: req.body.pseudo})
    if (user) {
        if (user.deleted === true) {
            return res.status(403).send('Utilisateur archivé')
        }
        const check = await UserModel.checkPassword(user, req.body.password)
        if (check) {
            const d = req.body.remember ? '30 days' : 60 * 60 * 8
            const accessToken = await jwt.sign({ user }, 'my_secret_key', { expiresIn: d }) // Génération du token avec une durée de vie de 8h ou 30 jours
            res.json({
                accessToken, user
            });
        } else {
           return res.status(404).send('Mot de passe incorrect.')
        }
    } else {
       return res.status(404).send('Utilisateur inexistant.')
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
                    // req.newToken = jwt.sign(jwt.decode(bearerToken).user, 'my_secret_key', { expiresIn: (15 * 60) }) // créer un nouveau token à partir de l'ancien pour etendre le login
                    next();
                }
            })
        }
    } else {
        res.sendStatus(401);
    }
}