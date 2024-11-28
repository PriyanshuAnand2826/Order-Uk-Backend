const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../Middlewares/authMiddleware')



//register api
router.post("/register", async (req, resp) => {
  try {
    const { name, email, password, mobile } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return resp.status(201).json({ message: "Email already exists" });
    } else {
     
      const hashedPassword = await bcrypt.hash(password, 10);
       user= await new User({name,email,mobile,password:hashedPassword})

      user.save();
      return resp
        .status(200)
        .json({ success: true, message: "User Registered Sucessfully" });
    }
  } catch (error) {
    return resp.status(400).json({ success: false, message: error.message });
  }
});


//login api 
router.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const {name}=user
        return resp
          .status(200)
          .json({
            success: true,
            message: "User Login Sucessfully",
            token: token,
            name:name
          });
        //token will be store in localstorage from frontend
      } else {
        return resp
          .status(201)
          .json({ success: false, message: "Invalid Password" });
      }
    }

    return resp
      .status(201)
      .json({ success: false, message: "User Not Registered" });
  } catch (error) {
    return resp.status(400).json({ success: false, message: error.message });
  }
});

//update api to be call in profile section 
router.put('/updateProfile',authMiddleware,async(req,resp)=>{
  try {
    const {user} = req
    const {name,gender,country} =req.body

    let userUpdate = await User.find({user})
    if(!userUpdate){
      return resp.status(404).json({message:'User not found'})
    }
    userUpdate = await User.findByIdAndUpdate (user,{name,gender,country},{new:true})
    return resp.status(200).json({success:true,message:'Profile Updated Sucessfully'})
  } catch (error) {
    return resp.status(400).json({success:false,message:"Internal Error",error:error.message})
    
  }
})


//get Profile for the user in Profile section
router.get('/getProfile',authMiddleware,async(req,resp)=>{
  try {
    const {user} = req
     const userProfile = await User.findById(user).select("-_id -password")
     return resp.status(200).json({success:true,message:'Profile Retrieved Sucessfully',userProfile})
  } catch (error) {
    return resp.status(400).json({message:'Internal Server Error',error:error.message})
  }
})


module.exports =  router

