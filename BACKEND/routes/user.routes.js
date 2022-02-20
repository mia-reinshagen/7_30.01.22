// Route pour les utilisateur 
const express = require('express');
const router = express.Router();

const passwordValidator = require("../middleware/passwordValidator")


const userCtrl = require('../controllers/User.controllers');

// Route pour crée un compte, et route de connexion
router.post('/signup',passwordValidator, userCtrl.signup);
router.post('/login',userCtrl.login);
router.get("/userInfo/:id",userCtrl.userInfo);
router.put("/editPassword/:id", userCtrl.editPassword);
router.put("/editPicture/:id", userCtrl.editPicture);
router.delete("/userInfo/:id", userCtrl.deleteUser);

module.exports = router;