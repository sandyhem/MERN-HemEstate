import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import Listing from "../models/listing.model.js"

export const test=async(req,res)=>{
    res.json({
        message:"test api is running success"
    })
}

export const update=async(req,res,next)=>{
  if(req.user.id != req.params.id){
    next(errorHandler(401,'You can update only your account!'));
  }
  try {
    if(req.body.password){
        req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
     $set:{
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      avatar:req.body.avatar
     } 
    } ,{new:true} )
    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest)

  } catch (error) {
    next(error)
  }
}

export const deleteuser=async(req,res,next)=>{
  if(req.user.id != req.params.id){
    next(errorHandler(401,'You can update only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message:'User has been deleted'
    }).clearCookie('access_token')
  } catch (error) {
    next(error) 
  }
}

export const getUserListing=async(req,res,next)=>{
  if(req.user.id === req.params.id){
    try {
       const listings=await Listing.find({
        userRef:req.params.id
       })
       res.status(200).json(listings);
    } catch (error) {
      next(error)
    }
  }
  else{
    return next(errorHandler(401,"you can only update your own account!"))
  }

}

export const getUser=async(req,res)=>
{
  try {
    const user=await User.findById(req.params.id);
    if(!user){
      return next(errorHandler(404,'User not found'));
    }
    const {password:pass,...rest}=user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}