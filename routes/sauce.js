// import express
const express = require("express");
// la fonction Router d'express permet de créer des routes individuelles 
// pour créer des objets router
const router = express.Router();

// import du controller sauce
const sauceCtrl = require("../controllers/sauce");
// / import middleware d'authentification à utiliser sur toutes les routes
const auth = require("../middleware/auth");
// // import middleware multer pour gestion enregistrement images, après 'auth'
const multer = require("../middleware/multer");

// je configure les routes
// ajouter une sauce, obligation de s'auth + multer qui gère les images
router.post("/", auth, multer, sauceCtrl.createSauce);
// afficher toutes les sauces dans la base données
router.get("/", auth, sauceCtrl.getAllSauces);
// afficher une sauce par son id
router.get("/:id", auth, sauceCtrl.getOneSauce);
// modifier une sauce, seul l'user qui a ajouté la sauce peut le faire
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
// suppr une sauce, seul l'user qui a ajouté la sauce peut le faire
router.delete("/:id", auth, sauceCtrl.deleteSauce);
// ajoute ou enlève un like à la sauce
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;