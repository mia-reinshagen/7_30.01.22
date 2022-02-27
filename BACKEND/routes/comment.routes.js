// Route pour les commentaires 
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const commentCtrl = require('../controllers/Comment.controllers');

router.post("/", auth, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.allComments);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;