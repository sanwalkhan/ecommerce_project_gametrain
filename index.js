
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import dotenv from 'dotenv';
const app=express();
 dotenv.config();
 app.use(bodyParser.json())
   

// app.use("/api",router)
 
 mongoose.connect(process.env.MONGO_URL)
 mongoose.connection.once("connected",()=>{
    console.log("Database Connected")
 })


 app.listen(process.env.PORT,()=>{
    console.log(`Server is running on: ${process.env.PORT}`)
 })
 

