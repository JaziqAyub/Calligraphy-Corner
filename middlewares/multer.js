const multer = require("multer");

const upload = multer({
  dest: "CCuploads",
});
const multmid = upload.single("image");


module.exports = { multmid };