//Configuration protégeant les routes en vérifiant l'authentification avant envoi des requêtes
// pour créer des tokens aléatoires et uniques pour la connexion
const jwt = require("jsonwebtoken");

// Pour protéger les informations de connexion vers la BDD
require("dotenv").config();

// j'exporte le module de token
// middleware a appliquer à nos routes sauces à proteger
module.exports = (req, res, next) => {
  try {
    // récupérer le token dans le header autorisation, le split
    // et récupérer le deuxième élément du tableau renvoyé
    const token = req.headers.authorization.split(" ")[1];
    // décoder le token en le vérifiant
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // extraire le userId grace au token
    const userId = decodedToken.userId;
    // si on a un userId dans le corps de la requête
    // et qu'il est différent du userId = erreur
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valable"; //Renvoie l'erreur
    } else {
      // si tout va bien, suivant
      next();
    }
  } catch (error) {
    
    // renvoyer une erreur 401, problème d'authentification
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};