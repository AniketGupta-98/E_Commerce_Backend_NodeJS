const mongoose = require("mongoose");
const Counter = require("./Counter");

const categorySchema = new mongoose.Schema(
    {
        categoryId: { type: String, unique: true },
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

categorySchema.pre("save", async function () {
  try {
    if (this.categoryId) return;

    const counter = await Counter.findOneAndUpdate(
      { key: "category" },
      { $inc: { seq: 1 } },
      {
        upsert: true,
        returnDocument: "after"
      }
    );

    const number = counter.seq.toString().padStart(3, "0");
    this.categoryId = `CAT-${number}`;

  } catch (err) {
    console.log("categorySchema:-",err);
  }
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;