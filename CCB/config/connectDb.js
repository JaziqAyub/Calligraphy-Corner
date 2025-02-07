const mongoose = require("mongoose")
require("dotenv").config()
// const uri = "mongodb+srv://jaziqayub00:abcdzxyw098@calligraphycorner.elpnj.mongodb.net/CC?retryWrites=true&w=majority&appName=CalligraphyCorner"
const uri = process.env.MONGO_URI

const connectDb = async ()=>{ 
    try {
        await mongoose.connect(uri) 
        console.log("Db connected!")
    } catch (error) {
        console.error(error)
    }
}

module.exports = (connectDb)