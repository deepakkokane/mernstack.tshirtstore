const User =require('../models/user')
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');


exports.signup=(req,res)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty()){
       return res.status(400).json({
            error:errors.array()[0].msg
        })
    }

    const user=new User(req.body)

    user.save((err,user)=>{
        if(err){
           return res.status(400).json({
                err:"oops somthing went wrong"
            })
        }
        res.json({
           email:user.email,
            id:user._id,
            name:user.name
        })
    })
}

exports.signin=(req,res)=>{
    const errors=validationResult(req)

    if(!errors.isEmpty()){
       return res.status(400).json({
            error:errors.array()[0].msg
        })
    }

    const {email,password}=req.body

    User.findOne({email},(err,user)=>{
        if(err||!user){
           return res.status(400).json({
                error:"user not present with this email"
            })
        }

        if(!user.authenticated(password)){
            return res.status(401)
            .json({
                error:"email and password do not match"
            })
        }

        var token=jwt.sign({_id:user._id},process.env.SECRET)
        
        res.cookie("token",token,{expire:new Date()+999});
            const {_id,name,role,email}=user
       return res.json({token,user:{_id,name,email,role}})

    })
}

exports.signout=(req,res)=>{

    res.clearCookie("token")

    res.json({
        message: "User signout successfully"
      });
}

exports.isSignedIn=expressJwt({
secret:process.env.SECRET,
userProperty:"auth"
})

exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile && req.auth && req.auth._id==req.profile._id;

    if(!checker){
       return res.status(403)
        .json({
            erroe:"ACCESS DIENIED"
        })
    }
    next()
}

exports.isAdmin=(req,res,next)=>{

    if(req.profile.role===0){
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
          });
    }
    next()
}