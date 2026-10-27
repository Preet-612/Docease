const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    }catch(error){
        console.log(`Database connection failed ${error}`)
    }
}

module.exports = connectDB;