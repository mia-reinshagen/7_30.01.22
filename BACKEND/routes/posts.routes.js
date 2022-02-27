// Route pour les posts 
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/Posts.controllers');

router.get('/', auth, postCtrl.allPosts);
router.get('/:id', auth, postCtrl.onePost);
router.get('/userPost/:id', postCtrl.userPost);
router.post('/createPost', auth, multer.single('file'), postCtrl.createPost);
router.post('/likes', auth, postCtrl.createLike);
router.delete('/:postId', auth, postCtrl.deletePost);


module.exports = router;

