const { messageHandler } = require("../utils/messageHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config()

//MIDDLEWARE
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies; 
    const secretKey = process.env.SECRET_KEY
    if (!token){
        return messageHandler(res, 403, "No token detected, access forbidden")
    }
    // if(!token){
    //     return messageHandler(res, 403, "No token detected, forbidden access")
    // }
    // const secretKey = "secretKey"
    // const verifyToken = jwt.verify(token, secretKey)
    // if (verifyToken){
    //     messageHandler(res, 200, "Token verified")
    // }else{
    //     return messageHandler(res, 401, "Unautorised access")
    // }

    // another way to do above
    jwt.verify(token, secretKey, (err, resolve) => {
      if (err) {
        return messageHandler(res, 401, "Unautorised");
      } else {
        // const userId = resolve.userId //from the loginHandler jwt which gets save in resolve.
        req.userId = resolve.userId
        return next() //means go to the next handler
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthenticated };
