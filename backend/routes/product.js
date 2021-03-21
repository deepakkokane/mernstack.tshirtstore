const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../cotrollers/auth");
const { getUserById } = require("../cotrollers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  removeProduct,
  updateProduct,
  getAllProduct,
  photo,
  getAllUniqueCategories
} = require("../cotrollers/product");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//create route

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin, 
  createProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);
//get Routes
router.get("/product/:productId", getProduct);
router.get('/product/photo/:productId',photo)


router.get("/products", getAllProduct);
router.get("/products/categories", getAllUniqueCategories);


module.exports = router;
