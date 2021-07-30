import express from 'express'
import AgencyModel from '../models/agencyModel.js'
const app = express();


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

// ** Création du token d'authentification avec jwt
app.post('/api/login', async (req, res) => { // route d'authentification
    // const bcrypt = require('bcryptjs') // cryptage du mdp avec bcrypt
    // let salt = await bcrypt.genSalt(10)
    // let hash = await bcrypt.hash(req.password, salt)

    console.log(req.body.pseudo);

    const agency = await Agency.login(req.body.pseudo, req.body.password); // login de l'utilisateur avec pseudo et mot de passe
    console.log(agency)
    if (agency) {
        const token = jwt.sign({agency}, 'my_secret_key'); // génération du token
        res.json({
            token, agency
        });
    } else {
        res.status(404).send('Utilisateur inexistant.')
    }
});

app.get('/api/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403); // si erreur, va envoyer un statut erreur ou que son token n'existe pas
        } else {
            res.json({
                text: 'protected',
                data: data
            });
        }
    })
});
function ensureToken(req, res, next) { // Fonction qui sert à vérifier que l'user qui suit cette route a créé un token avant
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1]; // Bearer = prefixe token
        req.token = bearerToken; // conserve le token dans l'objet de la demande
        next();
    } else {
        res.sendStatus(403);
    }
}