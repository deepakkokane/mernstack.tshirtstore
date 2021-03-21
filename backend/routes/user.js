const express = require("express");
const { isAuthenticated, isSignedIn, isAdmin } = require("../cotrollers/auth");
const router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../cotrollers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get(
  "/order/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
