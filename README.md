Convivio API

Développeurs:
Adrien Lubsec,
Laurie Fontaine,
Lucas Thomas,
Stéphane Cavillon

2021-2022 - CDA/CDEA - La Manu Amiens

# Installation
------
- Clone du repo git :
    `git clone https://github.com/laurieftn/Convivio.git `

- Configuration du .env avec les identifiants MongoDB

- Installation de node.js (minimum version 14.0.0)

- Installation de npm
    `npm install -g npm@latest` (à confirmer)

- Installation des dépendances
    `npm install`

# Lancement du server local

- `npm start` ou `nodemon index.js`

# Deploiement de l'API
- Installer le cli Heroku :
   `https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up`

- Créer l'application sur heroku :
    `heroku create <nom de l'app>`

- push de l'application sur heroku :
    `git push heroku master` ou `git push heroku <nom de branche>:main` (si le déploiement se fait à partir d'une branche)

## Pousser les changements sur l'API
- Ajouter la remote vers heroku :
    `git add remote heroku https://git.heroku.com/convivio-api.git`

- Enregistrer les modifications effectués
    `git add .`

- pusher ces modifications sur la remote heroku
    `git push heroku master`

# Testing
- installer mocha globallement
    `npm run test:watch` or `npm test`

# Seed DB
- users:
    `node data/seed.js -u n` seed n users

- events:
    `node data/seed.js -e n` seed n events

# Dump
- sauvegarder la base de données
    `mongodump --uri="mongodb+srv://convivioAdmin:convivio@convivio-api.nzfer.mongodb.net/convivio-api?retryWrites=true&w=majority"`
- visualiser les données au format JSON
    `bsondump <file_name>`
- restaurer la base de données
    `mongorestore <options> --uri="mongodb+srv://convivioAdmin:convivio@convivio-api.nzfer.mongodb.net/convivio-api?retryWrites=true&w=majority" <directory or file to restore>`