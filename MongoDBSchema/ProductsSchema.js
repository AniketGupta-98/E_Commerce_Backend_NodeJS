// Product {
//   _id: ObjectId,
//   name: String,
//   description: String,
//   price: Number,
//   stock: Number,
//   categoryId: ObjectId,
//   images: [String],
//   isActive: Boolean,
//   createdAt: Date
// }


// MongoDBSchema/ProductsSchema.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountPrice: Number,
    stock: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [String],
    brand: String,
    ratings: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

