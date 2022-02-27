const { Comments } = require('../models')

// Créer un commentaire
exports.createComment = async (req, res, next) => {
    const comment = req.body;
    await Comments.create(comment)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({error}))
};