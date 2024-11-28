const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true

},
mobile:{
  type:Number,
  require:true
},
gender:{
  type:String,
  default:null
},
country:{
  type:String,
  default:"India"
},

creationDate: {
    type: Date,
    default: Date.now
},
})

const User = mongoose.model("User",userSchema)
module.exports ={
  User
}