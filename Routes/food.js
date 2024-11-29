const express = require('express')
const { Food } = require('../Schemas/foodSchema')
const router = express.Router()

router.get('/:foodCategory',async(req,resp)=>{
   try {
    const {foodCategory} = req.params
     const data = await Food.find({foodCategory})
     return resp.status(201).json({success:true,message:'Data retreived successfully',number:data.length,data})
   } catch (error) {
    return resp.status(400).json({success:false,message:'Internal server error',error:error.message})
   }
})


module.exports = router