const express=require("express")
const cors=require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const{  mongodbconnection}=require("./connection/db")
mongodbconnection()
const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(cors())
const authRoutes=require("./routes/user")
app.use("/",authRoutes)
app.listen(process.env.port,()=>{
    console.log(`server started at:${process.env.port}` );
    
})