const express = require("express") //import express from node modules
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler } = require("./controllers/userController")
const connectDb = require("./config/connectDb")
const app = express() //instance of express
const cors = require("cors") 
const { isAuthorised } = require("./auth/isAuthorised")
require("dotenv").config() //.ENV

//middleware
app.use(express.json()) //to read json in thunderclient etc
app.use(cors()) //fo safety in b/w ports from front end to back end and vice versa




//To connect with the Db
connectDb()

// Apis (routes) User routes
app.get("/", (req, res) => { res.json({ message: "Hello!" }) })
app.post("/user/register", registerHandler) //done
app.post("/user/login", loginHandler) //done
app.post("/user/forgotPass", forgotPassHandler) //done
app.put("/user/password/reset/:userId", resetPassHandler) //done
app.post("/user/delete/:userId", deleteUserHandler) //done
app.get("/getUser/:userId", getUser) //done
app.post("/user/changePassword", changePasshandler) //done

//secureRoute
app.get("/user/isAuth/:token", isAuthorised) 
 

const PORT = process.env.PORT
 
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })