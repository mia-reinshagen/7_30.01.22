const fs = require("fs");

const db = require("../models");
const Posts = db.Posts;
const Likes = db.Likes;

// Récupère tout les post
exports.allPosts = async (req, res, next) => {
    const listOfPosts = await Posts.findAll({ 
      order: [["createdAt", "DESC"]],
      include: [Likes]});
    const likedPosts = await Likes.findAll({ where: { UserId: req.headers.userid}})
      res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts})
  };

  // Récupère un post par son Id
exports.onePost = async (req, res, next) => {
    const id = req.params.id;
    Posts.findByPk(id)
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
};

// Récupère tout les posts d'un utilisateur
exports.userPost = async (req, res, next) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ order: [["createdAt", "DESC"]], where : {UserId: id}});
    const likedPosts = await Likes.findAll({ where: { UserId: req.headers.userid}})
    res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts})
};

// Créer un post 
exports.createPost = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
   
        if (!req.body.postTitle || !req.body.postText) {
            return res.status(400).json({ message: 'Il faut remplir tous les champs!' })
        }

      try {
      
          if (req.file == undefined) {
            Posts.create({
              UserId: req.body.UserId,
              username: req.body.username,
              postTitle: req.body.postTitle,
              postText: req.body.postText
            }).then((postDatas) => {
             return res.status(200).json(postDatas);
            })
          } else {
            
            Posts.create({
              UserId: req.body.UserId,
              type: req.file.mimetype,
              name: req.file.originalname,
              filename: req.file.filename,
              username: req.body.username,
              postTitle: req.body.postTitle,
              postText: req.body.postText,
              data: fs.readFileSync(
                  "../backend/images/uploads/" + req.file.filename
              ),
              }).then((postDatas_image) => {
              fs.writeFileSync(
                  "../backend/images/tmp/" + postDatas_image.name,
                  postDatas_image.data
              )
      
            return res.status(200).json(postDatas_image);
          }).catch(error=>{
            return res.status(400).json(error);
          });
          }
        } catch (error) {
          return res.status(401).json(`Echec du telechargement du post: ${error}`);
        }
            },(error, req, res, next) => {
            res.status(400).json({ error: error.message })
            };
  
  // Supprimer un post 
exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userPost = await Posts.findOne ({
        where : {id : postId}
    })
    if (userPost.UserId == req.userId){
        Posts.destroy({ where: { id: postId } });
        return res.json ({message :"Post supprimé avec succès"});
    } else {
        return res.json ({message :"Vous ne pouvez pas supprimé ce post"});
    }
  }

  // Créer, supprimer un like
  exports.createLike = async (req, res, next) => {
    const { PostId, UserId } = req.body;
    const found = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });
    if (!found) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.json({ liked: true });
    } else {
      await Likes.destroy({
        where: { PostId: PostId, UserId: UserId },
      });
      res.json({ liked: false });
    }
}