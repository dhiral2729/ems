const User=require("../models/user")
const Employee=require("../models/empolyee")
const Department=require("../models/department")
const bcrypt=require("bcrypt")
const multer=require("multer")

const storage=multer.diskStorage({
  destination:(req,File,cb)=>{
    cb(null,"public/uploads")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now() + Path.extname(file.originalname))
  }
})
const upload=multer({storage:storage})

const addEmp=async(req,res)=>{
    try{
        const{userId,employeeId,dob,gender,maritalStatus,designation,department,salary,password,role,email,name}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({msg:"user are not found"})
        }
      const hashpassword=await bcrypt.hash(password,10)
      const newuser=new User({
        name,
        email,
        password:hashpassword,
        role,
        profileImg:req.file? req.file.filename:""
      })
     const saveUser= await newuser.save()
      
      const newemp=new Employee({
        userId:saveUser,employeeId,dob,gender,maritalStatus,designation,department,salary
      })
      await newemp.save()
      return res.status(200).json({msg:"suceesfully add"})
    }
    
    catch(error){
      console.log(error);
      return res.status(500).json({msg:"server side error"})
      
    }
}
module.exports={
  addEmp,
  upload
}