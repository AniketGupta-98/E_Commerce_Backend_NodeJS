import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                productName: String,
                price: Number,
                quantity: Number,
                totalPrice: Number
            }
        ],

        subtotal: {
            type: Number,
            required: true
        },

        couponId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon"
        },

        discountAmount: {
            type: Number,
            default: 0
        },

        totalAmount: {
            type: Number,
            required: true
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "CARD", "UPI", "NET_BANKING"],
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "PENDING"
        },

        orderStatus: {
            type: String,
            enum: [
                "PLACED",
                "CONFIRMED",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
            ],
            default: "PLACED"
        },

        shippingAddress: {
            fullName: String,
            phone: String,
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            pincode: String,
            country: String
        },

        transactionId: {
            type: String
        },

        isPaid: {
            type: Boolean,
            default: false
        },

        paidAt: {
            type: Date
        },

        deliveredAt: {
            type: Date
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
