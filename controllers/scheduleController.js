const Doctor = require("../models/doctorModel")
const Schedule = require("../models/scheduleModel")

const getScheduleByDoctor = async (req,res,next)=>{
    try{
        const {doctorId} = req.params

        console.log(doctorId)
        const check = await Doctor.findById(doctorId)
        if(!check){
            return res.status(409).json({message:"Doctor not found",error:error})
        }
        const schedule = await Schedule.find({doctorId:check}).sort({day:1})
        return res.send({schedules:schedule})

    }catch(error){
        return res.status(409).json({message:"Error fetching schedule",error:error})
    }
}

const createSchedule = async (req,res,next)=>{
    try{

        const {doctorId,day,startTime,endTime,slotDuration} = req.body
        if(!doctorId || !day || !startTime || !endTime ||!slotDuration){
            return res.status(400).json({message:"All fields are required"})
        }
            
        const doctor = await Doctor.findById(doctorId)
        if(!doctor){
            return res.status(404).json({message:"Doctor not found"})
        }
        const schedule = await Schedule.create({doctorId,day,startTime,endTime,slotDuration})
        res.status(201).json({message:"Schedule created successfully"})

    }catch(error){
        return res.status(409).json({message:"Schedule creation failed",error:error})
    }
}

        
        

const updateSchedule = async (req,res,next)=>{
    try{
        const {id} = req.params
        const {day,startTime,endTime,slotDuration} = req.body
        const schedule = await Schedule.findById(id)
        if(!schedule){
            return res.status(404).json({message:"Schedule not found"})
        }
        const updatedschedule = await Schedule.findByIdAndUpdate(id,{day,startTime,endTime,slotDuration},{new:true})
        return res.status(201).json({message:"Schedule updated successfully",updatedschedule})
    }catch(error){
        return res.status(409).json({message:"Error in updating schedule",error})
    }
}

module.exports = {getScheduleByDoctor,createSchedule,updateSchedule}