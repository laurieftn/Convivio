Convivio 

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
    `git push heroku master`