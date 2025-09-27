// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  mrp: Number,
  cost: Number,
  discountPercent: Number,
  category: String,
  subcategory: String,
  tagline: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
