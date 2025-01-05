const { messageHandler } = require("./messageHandler");

const cloudinary = require("cloudinary").v2;
require("dotenv").config(); //.ENV

//configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloud = async (imagePath) => {
  try {
    const upload = await cloudinary.uploader.upload(imagePath, {
      folder: "CC",
    });
    return upload;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadToCloud };
