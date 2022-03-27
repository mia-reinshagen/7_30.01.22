const { Comments } = require('../models')



// Créer un commentaire
exports.createComment = async (req, res, next) => {
    console.log(req.body);
    const comment = req.body;
    await Comments.create(comment)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({error}))
};

// Récupère tout les commentaires d'un post 
exports.allComments = (req, res, next) => {
    const PostId = req.params.id;
    Comments.findAll({where: { PostId: PostId}})
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({error}))
};


  exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.id;
    const userComment = await Comments.findOne ({
        where : {id : commentId}
    })
    if (userComment.UserId == req.userId){
        Comments.destroy({ where: { id: commentId } });
        return res.json ({message :"Commentaire supprimé avec succès"});
    } else {
        return res.json ({message :"Vous ne pouvez pas supprimé ce commentaire"});
    }
  }