const mongoose=require('mongoose')
const crypto = require('crypto');
const uuidv1=require('uuid/v1')

var  userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:30
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:30
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    encry_password:{
        type:String,
        required:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    },

},{timestamps:true})


userSchema.virtual("password")
    .set(function(password) {
        this._password=password
        this.salt=uuidv1()
        this.encry_password=this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods={

    authenticated:function(plainpassword){
        
        return this.encry_password===this.securePassword(plainpassword)
    },

     securePassword:function(plainpassword) {
        if(!plainpassword) return ""
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return ""
        }
      
    }
}

module.exports=mongoose.model('User',userSchema)