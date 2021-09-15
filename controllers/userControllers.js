import express from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

const app = express();

export const createUser = async function(req, res) {
    req.body.map(async (item) =>{
        item.password = await UserModel.hashing(item.password)
        const user = new UserModel(item)
        await user.save().then((response) => {
            res.status(200).send(response)
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

export const deleteUser = async function(req, res) {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
        res.status(404).send('Aucun évènement trouvé.')
    }
    res.status(200).send() // envoi la réponse
}

export const getUser = async function(req, res) {
    const user = await UserModel.findById(req.params.id, (error, doc) => {
        if (!error) {
                return doc
        } else {
            return res.status(404).send('L\'utilisateur n\'a pas été trouvé')
        }
    }) // si ça ne fonctionne pas ajouter un .exec()
    res.send(user)
}

export const getAllUsers = async function(req, res) {
    const users = await UserModel.find()
    if ( users.length < 1 ) {
        return res.status(404).send('Aucun utilisateur n\'a été trouvé')
    }
    res.send(users)
}


// ** Création du token d'authentification avec jwt
export async function login(req, res) { // Route d'authentification
    const user = await UserModel.findOne({pseudo: req.body.pseudo})
    if (user) {
        const check = await UserModel.checkPassword(user, req.body.password)
        console.log(check)
        if (check) {
            const token = jwt.sign({user}, 'my_secret_key', { expiresIn: '1h' }); // Génération du token avec une durée de vie d'1h
            res.json({
                token, user
            });
        } else {
            res.status(404).send('Mot de passe incorrect.')
        }
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