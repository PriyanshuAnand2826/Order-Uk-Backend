const mongoose = require('mongoose')
const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pin:{
       type:String,
       required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
})

const Profile = mongoose.model("Profile",profileSchema)
module.exports ={
    Profile
}