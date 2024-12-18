const mongoose = require("mongoose")
// const uri = "mongodb+srv://jaziqayub00:abcdzxyw098@calligraphycorner.elpnj.mongodb.net/CC?retryWrites=true&w=majority&appName=CalligraphyCorner"
const uri = "mongodb://localhost:27017/cc"

const connectDb = async ()=>{ 
    try {
        await mongoose.connect(uri) 
        console.log("Db connected!")
    } catch (error) {
        console.error(error)
    }
}

module.exports = (connectDb)