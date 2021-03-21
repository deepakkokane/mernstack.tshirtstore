require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const orderRoutes=require('./routes/order')
const paymentRoutes=require('./routes/payment')
const app=express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',orderRoutes)
app.use('/api',paymentRoutes)


const port=process.env.PORT || 8000
mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>{
    console.log('DB CONNECTED');
})
.catch(()=>{
    console.log('DB CONNECTION FAILED');
})


app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})
