// import mongoose from "mongoose";

// const couponSchema = new mongoose.Schema(
//     {
//         code: {
//             type: String,
//             required: true,
//             unique: true,
//             uppercase: true,
//             trim: true
//         },

//         description: {
//             type: String
//         },

//         discountType: {
//             type: String,
//             enum: ["percentage", "flat"],
//             required: true
//         },

//         discountValue: {
//             type: Number,
//             required: true
//         },

//         minOrderAmount: {
//             type: Number,
//             default: 0
//         },

//         maxDiscountAmount: {
//             type: Number
//         },

//         usageLimit: {
//             type: Number, // total usage allowed
//             default: 1
//         },

//         usedCount: {
//             type: Number,
//             default: 0
//         },

//         validFrom: {
//             type: Date,
//             required: true
//         },

//         validTill: {
//             type: Date,
//             required: true
//         },

//         isActive: {
//             type: Boolean,
//             default: true
//         },

//         applicableUsers: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User"
//             }
//         ], // optional: user-specific coupons

//         createdBy: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Admin"
//         }
//     },
//     { timestamps: true }
// );

// export default mongoose.model("Coupon", couponSchema);
