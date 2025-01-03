const { messageHandler } = require("./messageHandler");

const cloudinary = require("cloudinary").v2;
require("dotenv").config() //.ENV


//configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = async (imagePath) => {
  try {
    const up = await cloudinary.uploader.upload(imagePath, {
      folder: "CC",
    });
    if (up) {
      messageHandler(res, 200, "Upload Succesful");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {upload}