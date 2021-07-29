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


// ** Génération du token d'authentification avec jwt
app.post('/api/login', (req, res) => { // route d'authentification
    const agency = ({_id: req.params.id});
    const token = jwt.sign({agency}, 'my_secret_key');
    res.json({
        token
    });
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
    }) // reçoit le token de la demande, va utiliser la clé
});

function ensureToken(req, res, next) { // Fonction qui sert à vérifier que l'user qui suit cette route a créé un token avant
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1]; // 
        req.token = bearerToken; // conserve le token dans l'objet de la demande
        next();
    } else {
        res.sendStatus(403);
    }
}