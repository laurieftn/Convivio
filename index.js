import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000; // Déclare le port utilisé
const app = express(); // Création de l'objet représentant l'application express
const ENV = process.env.NODE_ENV
app.use(express.json()) // Pour que le serveur retourne les données en json

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
})

app.use(routes)

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`) // Permet de savoir si le serveur est bien relancé
    console.log(`Environnement de ${ENV}`)
})

export default app