const multer = require("multer");

const upload = multer({
  dest: "CCuploads",
  limits : {
    fieldSize : 1024*1024*10,
  }
});
const multmid = upload.single("image");


module.exports = { multmid };