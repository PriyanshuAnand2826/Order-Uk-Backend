const mongoose = require('mongoose')
const foodSchema = mongoose.Schema({
    foodName:{
        type:String,
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    foodCategory:{
      type:String
    }
})

const Food = mongoose.model('Food', foodSchema)
module.exports ={
    Food
}

