const mongoose =require('mongoose')
const cartSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    foodName:{
        type:String,
        required:true
    },
    price :{
        type:Number
    },
    quantity:{
        type:Number,
        default:1
    }
    
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = {
    Cart
}