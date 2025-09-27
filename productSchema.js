const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  countInStock: { type: Number, default: 0 },
  image: { type: String },
  offer: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "seller" }, // <-- Add this line
});

module.exports = mongoose.model("Product", productSchema);
// frontend/src/components/AddProduct.jsx
