const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const registerPatient = async (req,res,next)=>{
    try{
        const {name,email,password} = req.body || {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof(name) !== 'string' || !name.trim()){
            return res.status(400).json({message:'Please enter name'})
        }
        if (typeof(email) !== 'string' || !email.trim()){
            return res.status(400).json({message:'Please enter email'})
        }
        if (typeof(password) !== 'string' || password.length <= 8){
            return res.status(400).json({message:'Password must be atleast 8 character'})
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name:name.trim(),
            email:email.trim(),
            password:hashedPassword,
            role:'patient'
        })
        const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_KEY)
        return res.status(201).json({message:'Patient registered successfully',token,user:{id:user.id,name:user.name,email:user.email,role:user.role}})
    }catch(err){
        return res.status(409).json({message:'Account registration failed',error:err})
    }
}



const login = async (req,res,next)=>{

    try{
    const {email,password} = req.body || {}

    if (typeof(email) !== 'string' || !email.trim()){
            return res.status(400).json({message:'Email is required'})
    }
    if (typeof(password) !== 'string' || !password.trim()){
            return res.status(400).json({message:'Password is required'})
    }

    const user = await User.findOne({email:email.trim()})

    if (!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_KEY,{expiresIn:'1d'})
    
    return res.status(201).json({message:"Login Successfull",token,user:{id:user.id,name:user.name,email:user.email,role:user.role}})

    }catch(error){
        return res.status(409).json({message:'Login failed',error:error})
    }
}

module.exports = {registerPatient,login}