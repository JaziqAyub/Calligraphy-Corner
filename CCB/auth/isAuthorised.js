const { messageHandler } = require("../utils/messageHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const isAuthorised = async (req, res) => {
  try {
    const { token } = req.params;
    const secretKey = process.env.SECRET_KEY

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
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return messageHandler(res, 401, "Unautorised");
      } else {
        const userId = decoded.userId //from the loginHandler jwt which gets save in resolve.
        return messageHandler(res, 200, "Token verified", {userId});
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthorised };
