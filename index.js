const express = require("express") //import express from node modules
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler } = require("./controllers/userController")
const connectDb = require("./config/connectDb")
const app = express() //instance of express
const cors = require("cors") 
const { isAuthorised } = require("./auth/isAuthorised")
const { isAuthenticated } = require("./auth/isAuthenticated")
const cookieParser = require("cookie-parser")
const { createItem, getAllItems } = require("./controllers/itemController")
require("dotenv").config() //.ENV

//middleware
app.use(express.json()) //to read json in thunderclient etc
app.use(cors({
    origin: "http://localhost:3000",//koi bhi port accept
    credentials : true //acceptcookies
})) //fo safety in b/w ports from front end to back end and vice versa
app.use(cookieParser())//for saving userId, otken or etc in cookies



//To connect with the Db
connectDb()

// Apis (routes) User routes
app.get("/", (req, res) => { res.json({ message: "Hello!" }) })
app.post("/user/register", registerHandler) //done
app.post("/user/login", loginHandler) //done
app.post("/user/forgotPass", forgotPassHandler) //done
app.put("/user/password/reset/:userId", resetPassHandler) //done
app.get("/user/isAuth/:token", isAuthorised) 


//secureRoute
app.post("/user/delete", isAuthenticated, deleteUserHandler) //done
app.get("/getUser", isAuthenticated, getUser) //done
app.post("/user/changePassword",  isAuthenticated, changePasshandler) 


//itemRoutes
app.post("/admin/createItem", isAuthenticated, createItem) 
app.get("/items/all", isAuthenticated, getAllItems) 


const PORT = process.env.PORT
 
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })