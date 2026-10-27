const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    doctorId:{ type:mongoose.Schema.Types.ObjectId,ref:"Doctor",required:true},
    day:{type:String,required:true,enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],unique:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    slotDuration:{type:Number,required:true}
},{timestamps:true})

module.exports = mongoose.model("Schedule",scheduleSchema)