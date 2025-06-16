const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
        password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","employee"],
        required:true
    },
    profileImg:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
    
})

const User=mongoose.model("User",UserSchema)
module.exports=User;