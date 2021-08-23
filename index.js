import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()

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






