const mongoose = require("mongoose");

/**
 * Counter Schema
 */
const counterSchema = new mongoose.Schema({
  key: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
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

productSchema.pre("save", async function () {
  try {
    if (this.productId) return;

    const counter = await Counter.findOneAndUpdate(
      { key: "product" },
      { $inc: { seq: 1 } },
      {
        upsert: true,
        returnDocument: "after"
      }
    );

    const number = counter.seq.toString().padStart(3, "0");
    this.productId = `PRD-${number}`;

  } catch (err) {
    console.log("ProductSchema:-",err);
  }
});

module.exports = mongoose.model("Product", productSchema);