// Import mongoose, facilite les interactions avec la base de donnée
const mongoose = require("mongoose");


// création schema de données d'une sauce, contient champs souhaités pour chaque sauce
// indique le type et le caractère obligatoire ou non pour chaque attribut de l'objet
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});

/* export du schema en tant que modèle Mongoose,
appelé "Sauce" et avec le modèle d'une sauce en paramètre*/
module.exports = mongoose.model("sauce", sauceSchema);

/* Ce modèle permettra non seulement d'appliquer la structure de données,
 mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données*/