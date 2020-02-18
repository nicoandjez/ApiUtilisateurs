// model utilisateurs
const mongoose = require('mongoose');

var utilisateurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    login: String,
    password: String,
    utf: String
}); 
var Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;