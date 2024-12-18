const express = require("express") //import express from node modules
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler } = require("./controllers/userController")
const connectDb = require("./config/connectDb")
const app = express() //instance of express

//middleware
app.use(express.json()) //to read json in thunderclient etc

//To connect with the Db
connectDb()

// Apis (routes) 
app.get("/", (req, res) => { res.json({ message: "Hello!" }) })
app.post("/user/register", registerHandler)
app.post("/user/login", loginHandler)
app.post("/user/forgotPass", forgotPassHandler)
app.post("/user/password/reset/:userId", resetPassHandler)
app.post("/user/delete/", deleteUserHandler)
app.post("/getUser/", getUser)
app.post("/user/changePassword", changePasshandler)

const PORT = 4011

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })