const express =require('express')
const authMiddleware = require('../Middlewares/authMiddleware')
const { Profile } = require('../Schemas/profileSchema')
const {User} = require('../Schemas/UserSchema')
const router = express.Router()


//get api to get user adress
router.get('/getUserAddress',authMiddleware, async(req,resp)=>{
    try {
       const {user} =req
       const userProfile = await Profile.find({user}).select("-user")
       return resp.status(200).json({success:true,message:"The adresses are : ",data:userProfile}) 
    } catch (error) {
        return resp.status(500).json("Internal Server Error")
        
    }
})


//create api to create new adress
router.post('/createAddress',authMiddleware,async(req,resp)=>{
    try {
      const {user} =req
      const {city,state,pin,mobile,address} = req.body

      const userDetails = await User.findById(user).select('-_id -password')
      if(!userDetails){
        return resp.status(404).json({success:true,message:'User not found'})
      }
      const userProfile = await new Profile ({user:user,city,state,pin,mobile,address,name:userDetails.name,email:userDetails.email})
      await userProfile.save()
      return resp.status(200).json({success:true,message:'Addresss Added successfully'})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({message:"Internal Server Error",error:error.message})
        
    }
})

//edit address 
router.put('/editAddress/:id', async(req,resp)=>{
  try {
    const {id} = req.params
    const {city,state,pin,mobile,address} = req.body
    const addressDetails = await Profile.findByIdAndUpdate(id,{city,state,pin,mobile,address},{new:true})
    return resp.status(200).json({success:true,message:'Address Updated Sucessfully'})
  } catch (error) {
    return resp.status(400).json({message:'Inte'})
  }
})

//delete address 
router.delete('/deleteAddress/:id', async(req,resp)=>{
  try {
    const {id} = req.params
    const address = await Profile.findById(id)
        if(!address){
            return resp.status(200).json({message:"Address Not Found or either deleted"}) 
        }
    const addressDetails = await Profile.findByIdAndDelete(id)
    return resp.status(200).json({success:true,message:'Address Deleted Successfully'})
  } catch (error) {
    return resp.status(400).json({message:'Internal Server Error',error:error.message})
  }
})

//get address by id 
router.get('/getUserAddress/:id', async(req,resp)=>{
  try {
    const {id} = req.params
    const addressDetails = await Profile.findById(id).select('-_id -user')
    return resp.status(200).json({success:true,message:'Addresss Retrived Successfully by ID',data:addressDetails})
    
  } catch (error) {
    return resp.status(400).json({message:'Internal Server Error',error:error.message})
  }
})







module.exports = router