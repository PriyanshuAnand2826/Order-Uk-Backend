const express = require('express')
const authMiddleware = require('../Middlewares/authMiddleware')
const { Payment } = require('../Schemas/paymentSchema')
const { User } = require('../Schemas/UserSchema')
const router = express.Router()

//add payment method
router.post('/createPayment',authMiddleware,async (req,resp)=>{
  try {
    const {user} = req
    const userDetails = await User.findById(user)
    const {cardNumber,expiration,cvv,cardName} = req.body
    let paymentDetails = await Payment.find({user,cardNumber})
    if(paymentDetails.length !== 0){
        return resp.status(201).json({message:'Card Number already exists',success:false})
    }
    paymentDetails = await new Payment({cardNumber,expiration,cvv,cardName,user,name:userDetails.name,email:userDetails.email})
    await paymentDetails.save()
    return resp.status(200).json({success:true,message:"Card Added Successfully",data:paymentDetails})
  } catch (error) {
    return resp.status(400).json({message:'Internal Server Error',error:error.message})
    
  }
})


//get payment methods for a particular user 
router.get('/getPayment',authMiddleware,async (req,resp)=>{
    try {
        const {user} = req
        const paymentDetails = await Payment.find({user}).select('-user')
        return resp.status(200).json({success:true,message:"Payment Methods Retrieved Successfully",data:paymentDetails})
    } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
    }
})


//edit payment details
router.put('/editPayment/:id',authMiddleware,async(req,resp)=>{
    try {
       const {id} = req.params
       const {user} = req
       const {cardNumber,expiration,cvv,cardName} = req.body
       const cardExist = await Payment.find({user,cardNumber})
       if(cardExist.length !== 0){
        return resp.status(200).json({success:true,message:"Card Already exist for this user"})
       }
       const paymentDetails = await Payment.findByIdAndUpdate(id,{cardNumber,expiration,cvv,cardName},{new:true})
       return resp.status(200).json({success:true,message:"Payment Details Updated Successfully"})
    } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
    }
})


router.delete('/deletePayment/:id',async(req,resp)=>{
    try {
        const {id} = req.params
        const card = await Payment.findById(id)
        if(!card){
            return resp.status(200).json({message:"Card Not Found or either deleted"}) 
        }
        const paymentDetails = await Payment.findByIdAndDelete(id)
        return resp.status(200).json({success:true,message:'Payment Deleted Sucessfully'})
    } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
    }
})


//get the details by id 
router.get('/getPaymentById/:id',async(req,resp)=>{
    try {
      const {id} = req.params
      const paymentDetails = await Payment.findById(id).select('-user')
      if(!paymentDetails){
        return resp.status(200).json({message:"Card Not Found or either deleted"})
      }
      return resp.status(200).json({success:true,message:"Payment Details Retrieved Successfully",data:paymentDetails})
    } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
    }
})









module.exports=router