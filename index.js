require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');



port = process.env.PORT || 5000
const app = express();
app.use(express.json());

const startserver = async()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}


startserver();