const express=require('express')
const router=express.Router();
const {signout,signup,signin,isSignedIn}=require('../cotrollers/auth')
const { check, validationResult } = require('express-validator');

router.post('/signup',[
    check("password","password must contain at Least 6 Char").isLength({min:6}),
    check("name","Name must contain at Least 3 Char").isLength({min:3}),
    check("email","email is not valid").isEmail(),

],signup)
router.post('/signin',[
    check("password","password is required").isLength({min:1}),
    check("email","email is not valid").isEmail(),

],signin)
router.get('/signout',signout)

router.get('/test',isSignedIn,(req,res)=>{
    res.send("test Route")
})




module.exports=router;