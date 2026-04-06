// Payment {
//   _id: ObjectId,
//   orderId: ObjectId,
//   paymentMethod: "UPI | Card | COD",
//   paymentStatus: "Success | Failed | Pending",
//   transactionId: String,
//   paidAt: Date
// }

// MongoDBSchema/PaymentsSchema.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY", "STRIPE"],
    },

    transactionId: String,

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
