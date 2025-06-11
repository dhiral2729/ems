const jwt=require("jsonwebtoken")
const User=require("../models/user")
const bcrypt=require("bcrypt")

exports.authmiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        console.log(token);
        
        if(!token){
            return res.status(404).json({msg:"token are  not provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT)
        if(!decoded){
            return res.status(404).json({msg:"token are not valid"})
        }
        const user=await User.findById({_id:decoded._id})
        if(!user){
            return res.status(404).json({msg:"user not found"})
        }
        req.user=user;
        next()
    }
    catch(err){
     return res.status(500).json({msg:"server error"})
    }
}
