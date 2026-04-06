// Category {
//   _id: ObjectId,
//   name: String,
//   description: String,
//   isActive: Boolean,
//   createdAt: Date
// }

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        description: { type: String, required: true },

        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
