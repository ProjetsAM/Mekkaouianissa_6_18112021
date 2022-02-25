// On importe Mongoose
const mongoose = require ('mongoose');
// import de l'unique validator
const uniqueValidator = require("mongoose-unique-validator");

// Création du schéma de données pour l'email et le mot de passe
// email unique... (schéma d'infos dont nos objets auront besoin)
const userSchema = mongoose.Schema({
    // Ici on passe un objet dont notre schéma aura besoin
    email: { type: String, required: true, unique: true },
    //Required: true = champs requis // unique = impossible de s'inscrire plusieurs fois avec la même adresse mail
    password: { type: String, required: true },
  });


/* validator appliqué au schéma, on ne pourra pas 
avoir plusieurs users avec même adresse email et mot de passe*/
userSchema.plugin(uniqueValidator);

// Export du modèle terminé
module.exports = mongoose.model("User", userSchema);