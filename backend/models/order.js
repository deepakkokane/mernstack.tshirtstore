const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema


var ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number

})

const ProductCart=mongoose.model('ProductCart',ProductCartSchema)


var orederSchema=new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },

    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Order=mongoose.model('Order',orederSchema)

module.exports={ProductCart,Order}