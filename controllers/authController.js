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
        if (typeof(password) !== 'string' || password.length >= 8){
            
        }
    }catch(err){
        return res.status(409).json({message:'Account registration failed'})
    }
}

const login = async (req,res,next)=>{

}

module.exports = {registerPatient,login}