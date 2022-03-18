//Import nécessaires
// pour crypter les informations
const bcrypt = require("bcrypt"); // chiffrage du mot de passe
// pour créer des token introuvables et aléatoires
// = sécuriser la connexion au compte
const jwt = require("jsonwebtoken");
// importation du "model" de création utilisateur
const User = require("../models/user");

//infrastructure nécessaire pour les routes d'authentification
// fonction signup pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  bcrypt
    // hashage 10 fois du password avec bcrypt
    .hash(req.body.password, 10)
    // on récupère le hash
    .then((hash) => {
      // créer un nouvel utilisateur
     // on enregistre le hash dans un nouveau user avec l'email de la requete
      const user = new User({
        email: req.body.email, // récupère le corps de la requête = email
        password: hash, // hash le password quand l'utilisateur le crée
      });
      // on enregistre cet user dans la base de donnée
      user
        .save() // sauvegarder l'utilisateur dans la base de données
         // message de réussite renvoyé en json, code 201 : requête réussie + création de source
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé" }))
        // ou message en cas d'erreur, code 400 mauvaise requete du client  
        .catch((error) => res.status(400).json({ error }));
    })
    // message erreur code 500 : erreur serveur
    .catch((error) => res.status(500).json({ error }));
};

// fonction login pour connecter les users existants
exports.login = (req, res, next) => {
  // on vérifie si l'email utilisateur existe dans la base de données
  // trouver (recupérer) l'user dans la base de donnée qui correspond à l'email entrée
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log("user", user);
      // si on ne trouve pas l'user, on renvoi un 401 pour dire non autorisé
      if (!user) {
        // s'il n'existe pas
        return res.status(401).json({ error: "Erreur ! Utilisateur non trouvé !" });
      }
      /* on utilise bcrypt pour comparer les hash,
      le mdp envoyé avec la requete et le hash enregistré dans database*/
      bcrypt
        // on compare les entrées et les données
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log("validation", valid);
          if (!valid) {
            // si c'est différent (false) on retourne un message d'erreur
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            /* si c'est bon(true),renvoi statut 200 = bonne connexion et renvoi son userId
            et 1 token au front-end*/
            userId: user._id,
            // on appelle la fonction sign de jsonwebtoken pour encoder un nouveau token
            token: jwt.sign(
              /* ID de l'user en tant que données à encoder dans le token, pour être sûre
              que la requete correspond bien à l'userId*/
              { userId: user._id },
              process.env.SECRET_TOKEN, // avec une clé secrète pour l'encodage
              { expiresIn: "24h" } /* expiration du token qui est valide 24h sinon
               l'user doit se reconnecter*/
              // On renvoie le token au front avec notre réponse 
            ),
          });
        })
         // message erreur code 500 : erreur serveur
        .catch((error) => res.status(500).json({ error }));
    })
     // message erreur code 500 : erreur serveur
    .catch((error) => res.status(500).json({ error }));
};    