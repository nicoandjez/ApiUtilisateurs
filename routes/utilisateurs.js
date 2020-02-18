// description de la route ./utilisateurs appelée dans apiUtilisateurs.js

const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = require('express').Router();
let utilisateur = require('../models/utilisateurs.model');

router.route('/add')
    .post(function (req, res) {
        //utilisateur.ajouteUtilisateur(req, res);

        //********************
        var monUtilisateur = new utilisateur();
        monUtilisateur.nom = req.body.nom;
        monUtilisateur.prenom = req.body.prenom;
        monUtilisateur.email = req.body.email;
        monUtilisateur.login = req.body.login;
        monUtilisateur.password = req.body.password;
        monUtilisateur.utf = req.body.utf;

        monUtilisateur.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Bravo, l\'utilisateur  est maintenant stockée en base de données', "id": monUtilisateur.id });
        })
        //**************
    });

router.route('/list')
    .get(function (req, res) {
        utilisateur.find()
            .then(utilisateurs => res.json(utilisateurs))
            .catch(err => res.status(400).json('Error: ' + err));
    })
;


router.route('/id/:utilisateur_id')
    .get(function (req, res) {
        //utilisateur.getUtilisateur(req, res)
        utilisateur.findById(req.params.utilisateur_id, function (err, utilisateur) {
            if (err)
                res.send(err);
            res.json(utilisateur);
        });
    })
    .put(function (req, res) {
        //utilisateur.UpdateUtilisateur(req, res)
        utilisateur.findById(req.params.utilisateur_id, function (err, utilisateur) {
            if (err) res.send(err);
            utilisateur.nom = req.body.nom;
            utilisateur.prenom = req.body.prenom;
            utilisateur.email = req.body.email;
            utilisateur.login = req.body.login;
            utilisateur.password = req.body.password;
            utilisateur.utf = req.body.utf;
            utilisateur.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.send({ message: 'Bravo, l\'utilisateur  est mis à jour', "id": utilisateur.id });
            })
        });
    })
    .delete(function (req, res) {
        //deleteUtilisateur
        var tempUserName ;
        utilisateur.findById(req.params.utilisateur_id, function (err, utilisateur) {
            if (err) res.send(err);
            tempUserName = req.body.nom;
        });
        
        utilisateur.deleteOne({ _id: req.params.utilisateur_id }, function (err, utilisateur) {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Bravo, utilisateur supprimé", "nom": tempUserName });
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