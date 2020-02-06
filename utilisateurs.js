const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const fs = require('fs')


var utilisateurSchema = mongoose.Schema({
    nom: String, 
    prenom: String, 
    email: String, 
    login: String,
    password : String ,
    utf : String
}); 
var utilisateurMongo = mongoose.model('utilisateurs', utilisateurSchema);

async function listeUtilisateurs(req,res){
    var filtreUtf = req.query.utf;
    var filtre ={};
    if(filtreUtf){
        filtre={'utf' : filtreUtf};
    };
    utilisateurMongo.find(filtre,function(err, utilisateurs){
        if (err){
            res.send(err); 
        }
        res.json(utilisateurs); 
    }); 
};

async function ajouteUtilisateur (req,res){
    var monUtilisateur = new utilisateurMongo()
    monUtilisateur.nom = req.body.nom
    monUtilisateur.prenom = req.body.prenom
    monUtilisateur.email = req.body.email
    monUtilisateur.login = req.body.login
    monUtilisateur.password = req.body.password
    monUtilisateur.utf = req.body.utf

    monUtilisateur.save(function(err){
        if(err){
          res.send(err);
        }
        res.send({message : 'Bravo, l\'utilisateur  est maintenant stockée en base de données', "id" : monUtilisateur.id});
      })
};

async function getUtilisateur(req,res)
{
    utilisateurMongo.findById(req.params.utilisateur_id, function(err, utilisateur) {
        if (err)
            res.send(err);
        res.json(utilisateur);
    });
};

async function UpdateUtilisateur(req,res){
    utilisateurMongo.findById(req.params.utilisateur_id, function(err, monUtilisateur) {
        if (err) res.send(err);
        monUtilisateur.nom = req.body.nom
        monUtilisateur.prenom = req.body.prenom
        monUtilisateur.email = req.body.email
        monUtilisateur.login = req.body.login
        monUtilisateur.password = req.body.password
        monUtilisateur.utf = req.body.utf
        monUtilisateur.save(function(err){
            if(err){
              res.send(err);
            }
            res.send({message : 'Bravo, l\'utilisateur  est mis à jour', "id" : monUtilisateur.id});
          })
    });
};

async function deleteUtilisateur(req,res){
    utilisateurMongo.remove({_id: req.params.utilisateur_id}, function(err, monUtilisateur){
        if (err){
            res.send(err); 
        }
        res.json({message:"Bravo, utilisateur supprimé"}); 
    }); 
}

async function authentification(req,res)
{
    var login = req.query.login;
    var password = req.query.password;
    if( login != undefined && password != undefined){
        var filtre ={'login' : login, 'password' : password};
        console.log(filtre)
        utilisateurMongo.find(filtre, function(err, utilisateur) {
            if (err) res.send(err);
            console.log(utilisateur.length)
            if (utilisateur.length > 0) {
                res.send(utilisateur);   
            }
            else{
                res.send("c'est pas juste ");
            }
                
        });         
    }
    else
    {
        res.send("Il faut envoyer les paramètres login et password");   
    }
};

async function tokenjwt(req,res){
    var privateKey = fs.readFileSync('./secret.key', 'utf8');
    
    var login = req.query.login;
    var password = req.query.password;
    if( login != undefined && password != undefined){
        var filtre ={'login' : login, 'password' : password};
        console.log(filtre)
        utilisateurMongo.find(filtre, function(err, utilisateur) {
            if (err) res.send(err);
            if (utilisateur.length > 0) {
                var payload = {'nom': utilisateur[0].nom , 'prenom' : utilisateur[0].prenom,'id' : utilisateur[0]._id  };
                console.log(payload)
                var token = jwt.sign(payload,privateKey , { algorithm: 'HS256'});
                res.send(token);   
            }
            else{
                res.send("c'est pas juste ");
            }           
        });         
    }
    else
    {
        res.send("Il faut envoyer les paramètres login et password");   
    }
};

exports.listeUtilisateurs = listeUtilisateurs;
exports.ajouteUtilisateur = ajouteUtilisateur;
exports.getUtilisateur = getUtilisateur;
exports.UpdateUtilisateur = UpdateUtilisateur;
exports.deleteUtilisateur = deleteUtilisateur;
exports.authentification = authentification;
exports.tokenjwt=tokenjwt;
