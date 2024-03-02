const multer = require('multer');
//const path = require("path");

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/products/")
    },
    filename: function(req, file, cb){
        const fileName = `${Date.now()}_${file.originalname}`
        cb(null, fileName)
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
  }).array('images', 5); // Maximum 5 images can be uploaded

module.exports = upload;