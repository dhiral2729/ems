const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.Signup = async (req, res) => {
    try {
        const{name,email,password,role}=req.body
        if(!name || !email || !password){
            return res.status(404).json({msg:"all fields are required"})
        }
        const existingusers=await User.findOne({email})
        if(existingusers){
            return res.status(409).json({msg:"email alerdy registerd"})
        }
        if(role === "admin"){
            const existingadmin=await User.findOne({role:"admin"})
            if(existingadmin){
                return res.status(409).json({msg:"Admin user already exists"})
            }
        }
        if(password.length<6){
            return res.status(400).json({msg:"password must be 6 character"})
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            name,
            email,
            password: hashpassword,
            role: role || "admin"
        });

        await newuser.save();
        res.status(201).json({ msg: "Admin user created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.Login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"email are not found"})
        }
        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({msg:"password is wrong"})
        }
        const token=jwt.sign({_id:user._id,role:user.role},
        process.env.JWT)
        return res.status(200).json({msg:"successfully",token,_id:user._id,name:user.name,role:user.role})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({msg:"Server error"})
        
    }
}

