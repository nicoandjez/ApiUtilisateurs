// JBA description de la route ./utilisateurs appel�e dans apiUtilisateurs.js
// d�claration du super objet mongoose
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//JBA d�claration de la super route � renvoyer � la fin
const router = require("express").Router();
//JBA appel du model utilisateur
let utilisateur = require("../models/utilisateurs.model");

//JBA on donne un nom � la route pour quelle soit parlante
//JBA ajouter un user route = ./utilisateurs/add
router.route("/add").post(function(req, res) {
  //utilisateur.ajouteUtilisateur(req, res);

  //********************
  var monUtilisateur = new utilisateur();
  monUtilisateur.nom = req.body.nom;
  monUtilisateur.prenom = req.body.prenom;
  monUtilisateur.email = req.body.email;
  monUtilisateur.login = req.body.login;
  monUtilisateur.password = req.body.password;
  monUtilisateur.utf = req.body.utf;

  monUtilisateur.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send({
      message:
        "Bravo, l'utilisateur  est maintenant stock�e en base de donn�es",
      id: monUtilisateur.id
    });
  });
  //**************
});
////JBA lister tous les utilisateurs route = ./utilisateurs/list
//!NIE on n'utilise pas List pour lister
//
router.route("/").get(function(req, res) {
  utilisateur
    .find()
    .then(utilisateurs => res.json(utilisateurs))
    .catch(err => res.status(400).json("Error: " + err));
});

//JBA agir sur un utilisateur en utilisant son id route = ./utilisateurs/id/
// param�tre :utilisateur_id
// appel des m�thodes findById, save, deleteOne
//NIE On n'utilise pas add, POST sert à ça
router
  .route("/:utilisateur_id")
  .get(function(req, res) {
    //utilisateur.getUtilisateur(req, res)
    utilisateur.findById(req.params.utilisateur_id, function(err, utilisateur) {
      if (err) res.send(err);
      res.json(utilisateur);
    });
  })
  .put(function(req, res) {
    //utilisateur.UpdateUtilisateur(req, res)
    utilisateur.findById(req.params.utilisateur_id, function(err, utilisateur) {
      if (err) res.send(err);
      utilisateur.nom = req.body.nom;
      utilisateur.prenom = req.body.prenom;
      utilisateur.email = req.body.email;
      utilisateur.login = req.body.login;
      utilisateur.password = req.body.password;
      utilisateur.utf = req.body.utf;
      utilisateur.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.send({
          message: "Bravo, l'utilisateur  est mis � jour",
          id: utilisateur.id
        });
      });
    });
  })
  .delete(function(req, res) {
    //remplacement de la fonction remove par deleteOne. remove etant d�pr�ci�e
    utilisateur.findById(req.params.utilisateur_id, function(err, utilisateur) {
      if (err) res.send(err);
      tempUserName = utilisateur.nom;
      utilisateur.deleteOne({ _id: req.params.utilisateur_id }, function(
        err,
        utilisateur
      ) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Bravo, utilisateur " + tempUserName + " supprim�"
        });
      });
    });
  });
/*
router.route('/jwt')
    .get(function (req, res) {
        utilisateur.tokenjwt(req, res)
    });

router.route('/secret')
    .get(function (req, res) {
        var privateKey = fs.readFileSync('./secret.key', 'utf8');
        res.send(privateKey)
    });
*/
// exporte le routeur decrit dans ce fichier
module.exports = router;
