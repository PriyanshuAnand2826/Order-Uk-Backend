const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    cardNumber:{
        type:String,
        required:true,
        set: (value) => {
            // Store only the last 4 digits prefixed by XXXX
            const lastFourDigits = value.slice(-4);
            return `XXXX-XXXX-XXXX-${lastFourDigits}`;
          },
    },
    expiration:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true
    },
    cardName:{
        type:String,
        required:true
    },
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
    }
})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports={
    Payment
}