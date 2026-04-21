const mongoose = require("mongoose");

const Counter = require("./Counter");

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, unique: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true},
        accessToken: { type: String },
        refreshToken: { type: String},
        Fname: { type: String },
        Lname: { type: String },
        phone: String,
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        address: [
            {
                street: String,
                city: String,
                state: String,
                pincode: String,
                country: String,
            },
        ],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },

    { timestamps: true }
);

userSchema.pre("save", async function () {
  try {
    if (this.userId) return;

    const counter = await Counter.findOneAndUpdate(
      { key: "user" },
      { $inc: { seq: 1 } },
      {
        upsert: true,
        new: true,
      }
    );

    const number = counter.seq.toString().padStart(3, "0");
    this.userId = `USR-${number}`;

  } catch (err) {
    console.error("UserSchema Error:", err);

  }
});

const UserSchema = mongoose.model("User", userSchema);
module.exports = UserSchema;
