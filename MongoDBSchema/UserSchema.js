const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
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

const UserSchema = mongoose.model("User", userSchema);
module.exports = UserSchema;
