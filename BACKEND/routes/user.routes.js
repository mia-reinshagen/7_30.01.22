// Route pour les utilisateur 
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User.controllers');

// Route pour crée un compte, et route de connexion
router.post('/signup',userCtrl.signup);

module.exports = router;