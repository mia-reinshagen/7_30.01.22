// Route pour les utilisateur 
const express = require('express');
const router = express.Router();
//const bouncer = require('express-bouncer')(10000, 60000, 5);


const userCtrl = require('../controllers/User.controllers');

// Route pour crée un compte, et route de connexion
router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);

module.exports = router;