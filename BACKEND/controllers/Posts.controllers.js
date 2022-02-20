/* const fs = require("fs");

const db = require("../models");
const Posts = db.Posts;


// Créer un post 
exports.createPost = async (req, res, next) => {
    console.log(req)
      try {
      
          if (req.file == undefined) {
            Posts.create({
              UserId: req.body.userId,
              username: req.body.username,
              postText: req.body.postText
            }).then(() => {
              return res.send(`Publication sans image crée`);
            })
          } else {
            Posts.create({
              UserId: req.body.userId,
              type: req.file.mimetype,
              name: req.file.originalname,
              filename: req.file.filename,
              username: req.body.username,
              postText: req.body.postText,
              data: fs.readFileSync(
                  "../Backend/images/uploads/" + req.file.filename
              ),
              }).then((image) => {
              fs.writeFileSync(
                  "../Backend/images/tmp/" + image.name,
                  image.data
              );
      
            return res.send(`Publication avec Image crée`);
          });
          }
        } catch (error) {
          return res.send(`Echec du telechargement du post: ${error}`);
        }
  };
  */