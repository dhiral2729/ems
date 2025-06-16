const mongoose=require("mongoose")

const departmentSchema=new mongoose.Schema({
    dep_name:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },
    
},{timestamp:true})

const Department=mongoose.model("Department",departmentSchema)
module.exports=Department;

