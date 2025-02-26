const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  }else {
    req.errorMessage = "File is not valid image"
    cb(null, false);
  }
}

const uploadFile = multer({storage: storage, fileFilter: fileFilter}).single("image");



module.exports = {uploadFile}