const { Comments } = require('../models')



// Créer un commentaire
exports.createComment = async (req, res, next) => {
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

