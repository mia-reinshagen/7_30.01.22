// Route pour les utilisateur 
const express = require('express');
const router = express.Router();
// const bouncer = require('express-bouncer')(10000, 60000, 5);

const passwordValidator = require("../middleware/passwordValidator")
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/User.controllers');

// Route pour crée un compte, et route de connexion
router.post('/signup', userCtrl.signup);
// router.post('/login', bouncer.block, userCtrl.login);
router.post('/login', userCtrl.login);
router.get("/userinfo/:id", auth, userCtrl.userInfo);
router.get("/authuser", auth, userCtrl.authUser);
router.put("/editpassword/:id", auth, userCtrl.editPassword);
router.put("/editpicture/:id", auth, multer.single('file'), userCtrl.editPicture);
router.delete("/userinfo/:id", auth, userCtrl.deleteUser);

module.exports = router;