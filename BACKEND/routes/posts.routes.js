// Route pour les posts 
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/Posts.controllers');

router.post('/createPost', auth, multer.single('file'), postCtrl.createPost)


module.exports = router;

