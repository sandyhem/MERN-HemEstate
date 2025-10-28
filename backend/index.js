import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/list.route.js"
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
dotenv.config();
import cors from 'cors';

connectDB();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})