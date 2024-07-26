import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup=async(req,res,next)=>{
const {username,email,password}=req.body;
const hashedPassword=bcryptjs.hashSync(password,10)
const newUser= new User({username,email,password:hashedPassword});
try {
await newUser.save()
res.status(201).json({
    message:"User Created Successfully"
})
} catch (error) {
   next(error)
    // next(errorHandler(550,'error from the function'))
    // handwritten error
}
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"))
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,"Wrong Credentials!"));
        }
        const token=jwt.sign({
            id:validUser._id},process.env.SECRET,)

        //remove password from response.
        const {password:pass, ...rest}=validUser._doc;
        
       res.cookie('access_token',token,
        {
            httpOnly:true
        }
       ).status(200).json({
       rest
       })
  

    } catch (error) {
        next(error);
    }
}

