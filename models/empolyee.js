const mongoose=require("mongoose")

const EmployeeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    employeeId:{
        type:String,
        unique:true,
        required:true
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    designation:{
        type:String
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
   createdAt:{
    type:Date,
    default:Date.now
   },
    updatedAt:{
    type:Date,
    default:Date.now
   }


},{timestamps:true}) 

const Employee=mongoose.model("employee",EmployeeSchema)
module.exports=Employee;