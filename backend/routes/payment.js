const express = require("express");
const router = express.Router();
const { isAuthenticated,isSignedIn } = require("../cotrollers/auth");
const { getToken,processPayment } = require("../cotrollers/payment");
const { getUserById } = require("../cotrollers/user");

router.param("userId",getUserById)

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken)

router.post ('/payment/btree/:userId',isSignedIn,isAuthenticated,processPayment)

module.exports=router;