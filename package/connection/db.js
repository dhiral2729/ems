const mongoose=require("mongoose")
const mongourl=process.env.MONGO_URL;
const mongodbconnection=async(req,res)=>{
  try{
    await mongoose.connect(mongourl)
    console.log("mongodb conncted:");
    
  }
  catch(err){
    console.log(err);
    
  }
}
module.exports={
  mongodbconnection
}



