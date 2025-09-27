const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  sellerRegister,
  sellerLogIn,
} = require("../controllers/sellerController.js");

const {
  productCreate,
  getProducts,
  getProductDetail,
  searchProduct,
  searchProductbyCategory,
  searchProductbySubCategory,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  deleteProducts,
  deleteProductReview,
  deleteAllProductReviews,
  addReview,
  getInterestedCustomers,
  getAddedToCartProducts,
} = require("../controllers/productController.js");

const {
  customerRegister,
  customerLogIn,
  getCartDetail,
  cartUpdate,
} = require("../controllers/customerController.js");

const {
  newOrder,
  getOrderedProductsByCustomer,
  getOrderedProductsBySeller,
} = require("../controllers/orderController.js");

const upload = require("../middleware/uploadMiddleware"); // ✅ keep only one import

// ----------------- SELLER -----------------
router.post("/SellerRegister", sellerRegister);
router.post("/SellerLogin", sellerLogIn);

// ----------------- PRODUCT -----------------
router.post("/ProductCreate", productCreate);
router.get("/getSellerProducts/:id", getSellerProducts);
router.get("/getProducts", getProducts);
router.get("/getProductDetail/:id", getProductDetail);
router.get("/getInterestedCustomers/:id", getInterestedCustomers);
router.get("/getAddedToCartProducts/:id", getAddedToCartProducts);

router.put("/ProductUpdate/:id", updateProduct);
router.put("/addReview/:id", addReview);

router.get("/searchProduct/:key", searchProduct);
router.get("/searchProductbyCategory/:key", searchProductbyCategory);
router.get("/searchProductbySubCategory/:key", searchProductbySubCategory);

router.delete("/DeleteProduct/:id", deleteProduct);
router.delete("/DeleteProducts/:id", deleteProducts);
router.put("/deleteProductReview/:id", deleteProductReview);
router.delete("/deleteAllProductReviews/:id", deleteAllProductReviews);

// ✅ Upload image route
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// ----------------- CUSTOMER -----------------
router.post("/CustomerRegister", customerRegister);
router.post("/CustomerLogin", customerLogIn);
router.get("/getCartDetail/:id", getCartDetail);
router.put("/CustomerUpdate/:id", cartUpdate);

// ----------------- ORDER -----------------
router.post("/newOrder", newOrder);
router.get("/getOrderedProductsByCustomer/:id", getOrderedProductsByCustomer);
router.get("/getOrderedProductsBySeller/:id", getOrderedProductsBySeller);

module.exports = router;
