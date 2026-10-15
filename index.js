require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')


port = process.env.PORT || 5000
const app = express();
app.use(express.json());


app.use('/api/auth',authRoutes);

const startserver = async()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}


startserver();