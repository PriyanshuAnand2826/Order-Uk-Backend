const express = require('express')
const app =express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()
const {incomingRequestLogger} = require('./Middlewares/Request')
const UserRouter = require('./Routes/user')
const cartRouter = require('./Routes/cart')
const paymentRouter =  require('./Routes/payment')
const profileRouter = require('./Routes/profile')

const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


//importing middlewares
app.use(incomingRequestLogger)
app.use('/user',UserRouter)
app.use('/cart',cartRouter)
app.use('/payment',paymentRouter)
app.use('/address',profileRouter)





//port listening 
app.listen(port,()=>{
    console.log(`App is running on ${port}`)
    mongoose.connect(process.env.MONGO_URI).then((result) => {
        console.log('Connected to MongoDB')
        
    }).catch((err) => {
        console.log("Error connectinng DB")
        
    });
})