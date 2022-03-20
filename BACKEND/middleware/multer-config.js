// Creation du Middleware Multer, pour la gestion et sauvegarde d'images
const multer = require("multer");

const imageFilter = (req,file, cb,res) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ 
  storage: storage, 
  fileFilter: imageFilter,
  limits: {fieldSize: 4000000} });
module.exports = uploadFile;