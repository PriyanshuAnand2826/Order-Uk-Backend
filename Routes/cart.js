const express = require('express')
const authMiddleware = require('../Middlewares/authMiddleware')
const { User } = require('../Schemas/UserSchema')
const { Cart } = require('../Schemas/cartSchema')
const router = express.Router()


// api to post data in cart 
router.post('/addToCart',authMiddleware,async(req,resp)=>{
 try {
    const {user} = req
    const {foodName,price,unitPrice} = req.body
    const userDetails = await User.findById(user)
    let product = await Cart.find({foodName,user})
    if(product.length !== 0 ){ 
      return resp.status(201).json({message:"Item is already in cart",product})   
    }
    product = new Cart({foodName,price,unitPrice,name:userDetails.name,email:userDetails.email,user})
    await product.save()
    return resp.status(200).json({success:true,message:"Added to cart successfully",product,user})
 } catch (error) {
    return resp.status(400).json({message:'Internal Server Error',error:error.message})
 }
})


//api to get cart items for user 
router.get('/getCartItems',authMiddleware,async(req,resp)=>{
    try {
       const {user} = req
       const cartItems = await Cart.find({user})
       return resp.status(200).json({success:true,message:"Cart items fetched successfully",cartItems})
    } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
    }
})



//api to update cart items 
router.put('/updateCart/:id',async(req,resp)=>{
    const {id} = req.params
    const {quantity} = req.body
     try {
        const cartItem = await Cart.findById(id);
        if (!cartItem) {
          return resp.status(404).json({ message: "Item not found in cart" });
        }
     const updatedPrice = cartItem.unitPrice * quantity
     cartItem.quantity = quantity;
     cartItem.price = updatedPrice;

    // Save the updated item
    const updatedCartItem = await cartItem.save();
        return resp.status(200).json({success:true,message:"Cart item updated successfully",updatedCartItem})
     } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
     }
})



//api to delete the item  
router.delete('/deleteCart/:id',async(req,resp)=>{
    try {
        const {id} = req.params
        const item = await Cart.findById(id)
        if(!item){
            return resp.status(200).json({message:"Item Not Found or either deleted"}) 
        }
        const cartItem = await Cart.findByIdAndDelete(id);
        return resp.status(200).json({message:"Item Deleted Successfully"})
    } catch (error) {
        return resp.status(400).json({message:'Internal Server Error',error:error.message})
    }
})












module.exports = router