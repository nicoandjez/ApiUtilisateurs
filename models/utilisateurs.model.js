// JBA fichier de définition du schéma et du model utilisateurs

const mongoose = require('mongoose');

var utilisateurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    login: String,
    password: String,
    utf: String
}); 

//JBA le nom de la collection dans la base mongo sera automatiquement créée comme étant
// le nom du model entre single quotes, en lower case, et au pluriel
var Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;