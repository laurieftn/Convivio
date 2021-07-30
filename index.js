import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const PORT = process.env.PORT || 3000; // Déclare le port utilisé

const app = express(); // création de l'objet représentant l'application express

app.use(express.json()) // pour que le serveur retourne les données en json

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
})

app.use(routes)

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`) // Permet de savoir si le serveur est bien relancé
})


// ** Création du token d'authentification avec jwt
app.post('/api/login', (req, res) => { // route d'authentification
    const agency = Agency.login(req.pseudo, req.password); // login de l'utilisateur avec pseudo et mot de passe
    if (agency) {
        const token = jwt.sign({agency}, 'my_secret_key'); // génération du token
        res.json({
            token
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

// Cryptage du mdp
const  bcrypt  =  require ( 'bcrypt' ) ;
