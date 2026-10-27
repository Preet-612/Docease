const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')

const createDoctor = async (req,res,next)=>{

    try{
        const {name,email,password,specialization,fees,bio} = req.body || {}
        
        
        if (typeof name !== 'string' || !name.trim()){
            return res.status(400).json({message:"Name is required"})
        }
        
        if (typeof email !== 'string' || !email.trim()){
            return res.status(400).json({message:"Email is required"})
        }
        
        if (typeof password !== 'string' || !password.trim()){
            return res.status(400).json({message:"Password is required"})
        }
        
        
        if (typeof password !== 'string' || !password){
            return res.status(400).json({message:"Password must be atleast 8 character"})
        }
        
        
        if (typeof specialization !== 'string' || !specialization.trim()){
            return res.status(400).json({message:"Specialization is required"})
        }
        
        if (typeof fees !== 'number' || fees < 0){
            return res.status(400).json({message:"Please enter valid fees"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        
        const user = await User.create({
            name:name.trim(),
            email:email.toLowerCase(),
            password:hashedPassword,
            role:'doctor'
        })
        try{
            const doctor = await Doctor.create({
                
                user:user._id,
                specialization:specialization,
                fees:fees,
            bio: typeof bio === 'string' ? bio.trim():''
        })
        const user_details = await Doctor.findById(doctor._id).populate('user','name email role')
        return res.status(201).json({message:"Doctor created successfully",user_details})
        }catch(error){
            await User.findByIdAndDelete(user._id)
            res.status(409).json({message:"Doctor Failed"})
        }
        
        
        }catch(error){
        return res.status(400).json({message:"Failed to create doctor profile"})
    }
}

const listDoctors = async (req,res,next)=>{

    try{
        const list_of_doctors = await Doctor.find({isActive:true}).populate("user",'name email')
        return res.status(201).json({message:"Doctor fetch sussessfully",total:list_of_doctors.length,list_of_doctors}) 
    }catch(error){
        return res.status(409).json({message:"Doctor fetch failed"}) 
    }

}

const getDoctorById = async (req,res,next)=>{
    
    try{
        const doctor = await Doctor.find({_id:req.params.id,isActive:true}).populate("user","name email")
        if(!doctor){
            return res.status(404).json({message:"Doctor not found"})
        }
        return res.status(201).json({message:"Doctor found Successfully",doctor})
    }catch(error){
        return res.status(409).json({message:"Doctor not fetch"})
    }
}

const updateDoctor = async (req,res,next)=>{
    try{

        const doctor = await Doctor.findById(req.params.id).populate("user","name email")
        const {specialization,fees,bio,isActive} = req.body

        if(specialization){
            doctor.specialization = specialization
        }
        if(fees!==undefined){
            if(typeof fees == 'number'){
            doctor.fees = fees
            }else{
                return res.status(409).json({message:"Enter valid fees"})
            }
        }
        if(bio!==undefined){
            doctor.bio = bio
        }
        if(isActive!==undefined){
            doctor.isActive = isActive
        }
        await doctor.save()
        res.status(201).json({message:"Doctor data updated successfully"})
    }catch(error){
        res.status(409).json({message:"Failed to update doctor data"})
    }
}

module.exports = {createDoctor,listDoctors,getDoctorById,updateDoctor}
    
    
    
    
