const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");  
//const utilisateur = require("./utilisateurs");
const fs = require('fs');
const app = express(); 

//JBA dotenv est un module permettant de charger les paramètres globaux depuis un fichier .env situé à la racine de l api
//JBA ne pas push le fichier .env dans GITHUB
//******************************
require('dotenv').config();
const hostname = process.env.HOST;
const port = process.env.PORT;
const uriMongo = process.env.URIMONGO;
//******************************

//NES Nous définissons ici les paramètres du serveur express
//******************************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//******************************

//NES options et chaine de connexion MongoDB Atlas
//**********************************
const optionsMongo = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology : true
  };
//NES Connexion à la base de donnée
mongoose
  .connect(uriMongo,optionsMongo)
  .then(() => {
    console.log("Connectée à la base Mongo");
  })
  .catch((e) => {
    console.log("Erreur de connexion à la base : " + e);
  });
//*************************************


//JBA definition et utilisation d un routeur interne au fichier pour l exemple, à externaliser plus tard
//**************************************
var myRouterMenu = express.Router(); 
//description du routeur, .all valable pour tous les types de passages POST, GET, PUT....
myRouterMenu.route('/')
    .all(function (req, res) {
        var message = "<h1>Bienvenue sur notre  API  Utilisateurs</h1><br>"
        message += "GET     <b>/utilisateurs/list</b> &#10132; Liste des utilisateurs<br>"
        message += "POST    <b>/utilisateurs/add</b> &#10132; Ajoute un utilisateur<br>"
        message += "<br><HR><br>"
        message += "GET     <b>/utilisateurs/id/utilisateurs_id</b> &#10132; Récupère un utilisateur<br>"
        message += "PUT     <b>/utilisateurs/id/utilisateurs_id</b> &#10132; Modifie un utilisateur<br>"
        message += "DELETE  <b>/utilisateurs/id/utilisateurs_id</b> &#10132; Supprime un utilisateur<br>"
        message += "<br><HR><br>"
        message += "GET     <b>/login?login=#monlogin&password=#monpassword</b> &#10132; Vérifie si le couple login mot de passe est juste<br>"
        res.send(message);

    });
// Nous demandons à l'application d'utiliser le routeur ci dessus
app.use(myRouterMenu);

// definition et utilisation d un routeur défini dans un autre fichier
// on utilise le routeur utilisateursRouter decrit dans ./routes/utilisateurs.js
// la route s appelera /utilisateurs comme décrite ci dessous
const utilisateursRouter = require('./routes/utilisateurs');
app.use('/utilisateurs', utilisateursRouter);

// Démarrer le serveur 
app.listen(port, () => {
    console.log(`Server is running on host ${hostname} and port: ${port}`);
});

