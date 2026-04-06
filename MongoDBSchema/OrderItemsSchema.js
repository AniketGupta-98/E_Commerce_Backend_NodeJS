// OrderItem {
//   _id: ObjectId,
//   orderId: ObjectId,
//   productId: ObjectId,
//   price: Number,
//   quantity: Number
// }

// MongoDBSchema/OrderItemsSchema.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  price: Number,
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
