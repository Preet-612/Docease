require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const scheduleroutes = require('./routes/scheduleRoutes')
const cors = require('cors')
const app = express();
port = process.env.PORT || 5000
app.use(cors())
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/schedule',scheduleroutes)

const startserver = async()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}


startserver();