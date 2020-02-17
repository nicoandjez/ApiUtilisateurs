const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");  
const utilisateur = require("./utilisateurs");
const fs = require('fs');

// Nous définissons ici les paramètres du serveur.
const hostname = '127.0.0.1'; 
const port = 5000; 
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//options et chaine de connexion MongoDB Atlas
const optionsMongo = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology : true
  };
//const uriMongo = "mongodb+srv://Nicolas:kopqsd@juxta-hfkgw.mongodb.net/test?retryWrites=true&w=majority";
const uriMongo = "mongodb+srv://adm_jez:jr01vl32mo@clustertest-jcbya.mongodb.net/test?retryWrites=true&w=majority";
//Connexion à la base de donnée
mongoose
  .connect(uriMongo,optionsMongo)
  .then(() => {
    console.log("Connectée à la base Mongo");
  })
  .catch((e) => {
    console.log("Erreur de connexion à la base : " + e);
  });

//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 

// /utilisateurs/
myRouter.route('/utilisateurs')
 .get(function(req,res){ 
    utilisateur.listeUtilisateurs(req,res);
})
.post(function(req,res){
    utilisateur.ajouteUtilisateur(req,res);
})

// /utilisateurs/:utilisateur_id
myRouter.route('/utilisateurs/:utilisateur_id')
.get(function(req,res){ 
    utilisateur.getUtilisateur(req,res)
})
.put(function(req,res){ 
    utilisateur.UpdateUtilisateur(req,res)})
.delete(function(req,res){ 
    utilisateur.deleteUtilisateur(req,res);
})

//LOGIN
myRouter.route('/login')
.get(function(req,res){
    utilisateur.authentification(req,res);          
})

// /
myRouter.route('/')
.all(function(req,res){
      var message = "<h1>Bienvenue sur notre  API  Utilisateurs</h1><br>"
      message+="GET     <b>/utilisateurs</b> &#10132; Liste des utilisateurs<br>"
      message+="POST    <b>/utilisateurs</b> &#10132; Ajoute un utilisateur<br>"
      message+="<br><HR><br>"
      message+="GET     <b>/utilisateurs/utilisateurs_id</b> &#10132; Récupère un utilisateur<br>"
      message+="PUT     <b>/utilisateurs/utilisateurs_id</b> &#10132; Modifie un utilisateur<br>"
      message+="DELETE  <b>/utilisateurs/utilisateurs_id</b> &#10132; Supprime un utilisateur<br>"
      message+="<br><HR><br>"
      message+="GET     <b>/login?login=#monlogin&password=#monpassword</b> &#10132; Vérifie si le couple login mot de passe est juste<br>"      
      res.send(message);

});

myRouter.route('/jwt')
.get(function(req,res){
  utilisateur.tokenjwt(req,res)
})

myRouter.route('/secret')
.get(function(req,res){
  var privateKey = fs.readFileSync('./secret.key', 'utf8');
  res.send(privateKey)
})



// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

